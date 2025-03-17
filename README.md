--------------------------

## **📌 1. 技术栈选择**

- **GUI 框架**：`PyQt6` 或 `Tkinter`（推荐 PyQt6，界面更美观）
- **HTTP 请求**：`requests` 或 `httpx`（支持异步请求）
- **HTML 解析**：`BeautifulSoup4`（解析静态页面）
- **动态渲染**（如果目标页面有 JavaScript 渲染）：`selenium` 或 `playwright`
- **文件存储**：`os` + `shutil`
- **进度条**：PyQt6 内置 `QProgressBar` 或 `tqdm`

------

## **📌 2. 目录结构**

```
web_fishing_go/
│── main.py           # 程序主入口
│── gui.py            # GUI 相关代码
│── downloader.py     # 负责网页下载
│── parser.py         # 解析和处理 HTML/CSS/JS
│── utils.py          # 工具函数
│── config.py         # 配置文件
│── output/           # 存放克隆后的网页
└── requirements.txt  # 依赖包
```

------

## **📌 3. 功能模块**

### **(1) GUI 界面**

✅ **主要功能**：

- 输入框（用户输入网址）
- 按钮（执行克隆、取消任务）
- 进度条（显示克隆进度）
- 目录路径显示（默认存储到 `output/`）

✅ **实现方式**：

- 使用 `PyQt6` 创建 UI 界面
- `QLineEdit` 作为输入框
- `QPushButton` 作为按钮
- `QProgressBar` 作为进度条
- `QLabel` 显示状态信息

------

### **(2) 网页下载**

✅ **主要功能**：

- 解析 HTML 文件
- 下载 CSS、JS、图片等资源
- 处理 `href` 和 `src` 绝对路径 -> 相对路径
- 存储到本地文件夹

✅ **实现方式**：

- 使用 `requests.get(url)` 下载静态 HTML
- `BeautifulSoup4` 解析 HTML 并提取资源链接
- 使用 `os.makedirs()` 在 `output/` 目录中创建对应网页的目录
- 使用 `shutil.copy()` 复制资源到本地
- 如果需要 JS 渲染，使用 `playwright` 或 `selenium`

------

### **(3) 进度条**

✅ **主要功能**：

- 显示网页下载进度（HTML -> CSS -> JS -> 图片）
- 支持多线程下载，防止 GUI 卡顿

✅ **实现方式**：

- `PyQt6.QProgressBar` 实现进度更新
- 使用 `QThread` 进行异步下载，防止主线程卡死
- `signal.emit()` 实时更新 UI

------

### **(4) 文件存储**

✅ **主要功能**：

- 在 `output/` 目录下创建以 URL 命名的文件夹
- 将克隆的网页存储到该文件夹内
- 支持手动选择存储位置（可选）

✅ **实现方式**：

- `os.makedirs()` 创建目录
- `shutil.copyfile()` 复制下载的文件
- `open(file, 'wb')` 存储 HTML 数据

------

## **📌 4. 具体实现步骤**

### **(1) 安装必要的 Python 依赖**

```python
pip install PyQt6 requests beautifulsoup4 selenium playwright tqdm
```

如果要使用 **Playwright** 进行 JS 渲染：

```python
playwright install
```

------

### **(2) 创建 GUI**

使用 **PyQt6** 创建基本 UI 界面：

```python
from PyQt6.QtWidgets import QApplication, QWidget, QVBoxLayout, QLineEdit, QPushButton, QProgressBar, QLabel

class WebCloneGUI(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("网页克隆工具")
        self.setGeometry(100, 100, 400, 200)

        layout = QVBoxLayout()

        self.url_input = QLineEdit(self)
        self.url_input.setPlaceholderText("请输入网址")
        layout.addWidget(self.url_input)

        self.start_button = QPushButton("开始克隆", self)
        self.start_button.clicked.connect(self.start_clone)
        layout.addWidget(self.start_button)

        self.progress = QProgressBar(self)
        layout.addWidget(self.progress)

        self.status_label = QLabel("状态：等待输入网址", self)
        layout.addWidget(self.status_label)

        self.setLayout(layout)

    def start_clone(self):
        url = self.url_input.text()
        self.status_label.setText(f"正在克隆：{url}")
        # 这里调用克隆函数
```

------

### **(3) 网页下载逻辑**

使用 `requests` 下载 HTML 和静态资源：

```python
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def download_website(url, output_folder="output"):
    parsed_url = urlparse(url)
    site_name = parsed_url.netloc.replace(".", "_")
    save_path = os.path.join(output_folder, site_name)

    os.makedirs(save_path, exist_ok=True)

    response = requests.get(url)
    if response.status_code != 200:
        print("无法访问网站")
        return

    soup = BeautifulSoup(response.text, "html.parser")

    # 下载 HTML
    with open(os.path.join(save_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(soup.prettify())

    # 下载 CSS、JS 和图片
    for tag in soup.find_all(["link", "script", "img"]):
        src_attr = "href" if tag.name == "link" else "src"
        if tag.has_attr(src_attr):
            file_url = urljoin(url, tag[src_attr])
            file_name = os.path.basename(file_url)
            file_path = os.path.join(save_path, file_name)

            try:
                file_data = requests.get(file_url).content
                with open(file_path, "wb") as f:
                    f.write(file_data)
                tag[src_attr] = file_name  # 修改 HTML 路径
            except:
                print(f"无法下载 {file_url}")

    # 保存修改后的 HTML
    with open(os.path.join(save_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(str(soup))
```

------

### **(4) 绑定 GUI 逻辑**

在 GUI 的 `start_clone()` 方法中调用 `download_website(url)`，并更新进度条。

------

## **📌 5. 未来扩展**

- ✅ **支持 JavaScript 渲染页面**（使用 `playwright` 或 `selenium`）
- ✅ **支持多线程加速下载**（`threading` 或 `asyncio`）
- ✅ **支持代理和 User-Agent 伪装**
- ✅ **支持增量更新和断点续传**
- ✅ **支持 HTML 文件本地化（修改相对路径）**

------

### **📌 6. 总结**

- **使用 PyQt6 构建 GUI**
- **使用 requests/BeautifulSoup 下载 HTML 和资源**
- **使用线程+进度条实现异步更新**
- **存储到 `output/` 目录**
- **未来可扩展 JS 渲染、代理等功能**