<!DOCTYPE html>

<html>
<head><meta charset="utf-8"/>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="IE=Edge,chrome=1" http-equiv="X-UA-Compatible"/>
<meta content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" name="viewport"/>
<title>会员登录_网钛远程桌面管理助手</title>
<meta content="" name="keywords">
<meta content="" name="description"/>
<link href="bootstrap.min.css" rel="stylesheet"/>
<link href="iconfont.css" rel="stylesheet"/>
<link href="login.css" rel="stylesheet"/>
<script language="javascript" type="text/javascript">
	var webTypeName='users';
	var dbPathPart='';
	var webPathPart='';
	var jsPathPart='';
	var isMobile='0';
	</script>
<script language="javascript" src="jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="configJs.js" type="text/javascript"></script>
<script language="javascript" src="common.js" type="text/javascript"></script>
<script language="javascript" src="users.js" type="text/javascript"></script>
</meta></head>
<body>
<div class="main-warp" id="main">
<div class="main-content">
<div class="formDiv">
<center><img alt="网钛远程桌面管理助手" class="logoImg" src="202105191213154812.png" title="网钛远程桌面管理助手"/></center>
<h2 class="text-center">
<div class="pointCurr" id="login_username" onclick="LoginModeTab('username')">用户名登录</div>
</h2>
<div class="dataform">
<form action="process.php" id="loginForm" method="post" name="loginForm" onsubmit="return CheckLoginForm();">
<input id="backURL" name="backURL" type="hidden" value=""/>
<input id="loginMode" name="loginMode" type="hidden" value=""/>
<input id="loginPwd" name="loginPwd" type="hidden" value="pwd"/>
<input id="loginMailMode" name="loginMailMode" type="hidden" value="0"/>
<input id="loginPhoneMode" name="loginPhoneMode" type="hidden" value="0"/>
<input id="pwdMode" name="pwdMode" type="hidden" value=""/>
<input id="pwdKey" name="pwdKey" type="hidden" value=""/>
<input id="pwdEnc" name="pwdEnc" type="hidden" value=""/>
<div class="input-warp gap" id="input_username">
<span class="input-icon iconfont icon-yonghu1"></span>
<input autocomplete="off" class="inputs" id="username" name="username" placeholder="请输入用户名" type="text"/>
</div>
<div class="input-warp gap" id="input_mail" style="display:none;">
<span class="input-icon iconfont icon-email"></span>
<input autocomplete="off" class="inputs" id="mail" name="mail" onblur="CheckMail()" placeholder="请输入邮箱" type="text"/>
<span class="isok" id="mailIsOk"></span>
<p class="errMsg" id="mailStr"></p>
</div>
<div class="form-item gap" id="input_mailCode" style="display:none;">
<div class="input-warp s">
<span class="input-icon iconfont icon-yanzhengma"></span>
<input class="inputs" id="mailCode" name="mailCode" placeholder="请输入邮箱验证码" type="text"/>
</div>
<div class="pull-right">
<input class="btn lgbtn blue" id="sendMail" onclick='SendMailCode(this.id,"mail","login","");' type="button" value="发送验证码"/>
</div>
</div>
<div class="input-warp gap" id="input_phone" style="display:none;">
<span class="input-icon iconfont icon-shouji"></span>
<input class="inputs" id="phone" name="phone" onblur="CheckPhone()" placeholder="请输入手机" type="text"/>
<span class="isok" id="phoneIsOk"></span>
<p class="errMsg" id="phoneStr"></p>
</div>
<div class="form-item gap" id="input_phoneCode" style="display:none;">
<div class="input-warp s">
<span class="input-icon iconfont icon-yanzhengma"></span>
<input class="inputs" id="phoneCode" name="phoneCode" placeholder="请输入短信验证码" type="text"/>
</div>
<div class="pull-right">
<input class="btn lgbtn blue" id="sendPhone" onclick='SendPhoneCode(this.id,"phone","login","");' type="button" value="发送验证码"/>
</div>
</div>
<div class="" id="input_pwd">
<div class="input-warp gap">
<span class="input-icon iconfont icon-baomi"></span>
<input autocomplete="off" class="inputs" id="userpwd" name="userpwd" placeholder="请输入密码" type="password"/>
</div>
</div>
<div class="form-item gap" id="verCodeBox" style="display:none">
<div class="form-item">
<div class="input-warp gap">
<span class="input-icon iconfont icon-yanzhengma"></span>
<input autocomplete="off" class="form-control" id="verCode" maxlength="16" name="verCode" onfocus='GetVerCode("input")' placeholder="验证码" style="width:120px;display:inline;" title="如看不清验证码，可以点击验证码进行更换" type="text"/>
<span id="showVerCode" onclick='GetVerCode("font")' style="margin:8px 0 0 8px;cursor:pointer;color:red;">点击获取验证码</span>
</div>
</div>
</div>
<div class="btn-warp gap">
<div class="text-center">
<button class="btn btn-block lgbtn blue">登录</button>
</div>
</div>
<div class="gap">
<div class="pull-right" style="margin-top: 6px">
<a class="link" href="?m=missPwd">忘记密码</a><span class="split-space">|</span>
<a class="link" href="?m=reg&amp;force=1">新用户注册</a>
</div>
<div class="pretty-box"></div>
</div>
</form>
<div class="biggap third-party-title">
<h5 class="text-center"><span>第三方账号登录</span></h5>
</div>
<div class="third-auth">
</div>
</div>
<div style="margin:35px 0 20px 0; width:100%; text-align:center;"><a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备12010380号</a></div>
<script language="javascript" type="text/javascript">
		LoginModeTab("username");
		</script>
</div>
</div>
</div>
</body>
</html>