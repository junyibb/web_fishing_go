--------------------------

# 钓鱼web克隆 (web_fishing_go)

**一款web克隆网页生成，可用于网络安全web网页钓鱼测试**

------

#### 页面截图

![1](https://github.com/junyibb/web_fishing_go/blob/main/image/1.png?raw=true)

## **📌 1. 目录结构**

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

## **📌 2. 使用教程**

## 方法一

### **1、 直接下载打包的EXE**

## 方法二

1、安装依赖。

2、运行脚本。

```python
pip install requirements.txt
python main.py
```

## **📌 3. 工具实测**

### 1、克隆完毕

![2](https://github.com/junyibb/web_fishing_go/blob/main/image/2.png?raw=true)

### 2、使用apache或者nginx都可以，但是PHP需5.6，或更低版本

![4](https://github.com/junyibb/web_fishing_go/blob/main/image/4.png?raw=true)

### 3、可以看到当点击登录会抓取POST的内容。

### 4、并弹出错误，点击重试会跳转到克隆时自定义的网址。

![7](https://github.com/junyibb/web_fishing_go/blob/main/image/7.png?raw=true)

### 5、可以看到成功生成txt，得到账号密码

![9](https://github.com/junyibb/web_fishing_go/blob/main/image/9.png?raw=true)

![10](https://github.com/junyibb/web_fishing_go/blob/main/image/10.png?raw=true)

## 本工具仅供学习和测试使用。使用本工具所产生的一切法律责任由使用者自行承担!