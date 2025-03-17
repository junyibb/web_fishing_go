import sys
from PyQt6.QtWidgets import QApplication
from PyQt6.QtGui import QIcon
from gui import WebCloneGUI
from downloader import WebDownloader

class WebCloneApp:
    def __init__(self):
        self.app = QApplication(sys.argv)
        
        # 设置应用图标
        self.app.setWindowIcon(QIcon("logo.png"))
        
        self.gui = WebCloneGUI()
        self.downloader = WebDownloader()
        
        # 连接信号
        self.gui.start_clone_signal.connect(
            lambda url, path, wait, cred, redirect: 
                self.downloader.download_website(url, path, wait, cred, redirect)
        )
        self.downloader.progress_updated.connect(self.gui.update_progress)
        self.downloader.status_updated.connect(self.gui.update_status)
        self.downloader.download_finished.connect(self.gui.clone_finished)
        
    def run(self):
        self.gui.show()
        return self.app.exec()

if __name__ == "__main__":
    app = WebCloneApp()
    sys.exit(app.run())