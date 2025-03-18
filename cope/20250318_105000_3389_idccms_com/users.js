
var waitSec = 0;
var cutWaitFunc = null;
// 检测注册表单
function CheckRegForm(){
	if ($id("judRegCode").value=="1"){
		if ($id("regCode").value==""){alert("注册邀请码不能为空！");$id("regCode").focus();return false;}
	}
	if ($id("username").value==""){alert("用户名不能为空！");$id("username").focus();return false;}
	try {
		if ($id("userpwd").value==""){alert("密码不能为空！");$id("userpwd").focus();return false;}
		if ($id("userpwd").value.length<6){alert("密码长度不能少于6位！");$id("userpwd").focus();return false;}
		if ($id("userpwd").value!=$id("userpwd2").value){alert("密码不一致！");$id("userpwd2").focus();return false;}
	}catch (e){}

	try {
		if ($id("question").value==""){alert("密保问题不能为空！");$id("question").focus();return false;}
		if ($id("answer").value==""){alert("密保答案不能为空！");$id("answer").focus();return false;}
	}catch (e){}
	try{
		var fieldStr = $id('regFieldStr').value;
		if (fieldStr.indexOf('|邮箱|') != -1){
			if (fieldStr.indexOf('|邮箱必填|') != -1){
				if ($id("mail").value.length == 0){alert("请输入邮箱！");$id("mail").focus();return false;}
				if (! IsMail($id("mail").value)){alert("邮箱格式错误！");$id("mail").focus();return false;}
				try {
					if ($id("mailCode").value==""){alert("邮件验证码不能为空.");$id("mailCode").focus();return false;}
				}catch (e){}
			}else{
				if ( $id("mail").value.length > 0 && (! IsMail($id("mail").value)) ){alert("邮箱格式错误，如不想填请留空！");$id("mail").focus();return false;}
			}
		}
		if (fieldStr.indexOf('|手机|') != -1){
			if (fieldStr.indexOf('|手机必填|') != -1){
				if ($id("phone").value.length == 0){alert("请输入手机");$id("phone").focus();return false;}
				if (! IsPhone($id("phone").value)){alert("手机号格式错误，长度11位！");$id("phone").focus();return false;}
				try {
					if ($id("phoneCode").value==""){alert("短信验证码不能为空.");$id("phoneCode").focus();return false;}
				}catch (e){}
			}else{
				if ( $id("phone").value.length > 0 && (! IsPhone($id("phone").value)) ){alert("手机号格式错误，长度11位，如不想填请留空！");$id("phone").focus();return false;}
			}
		}
		if (fieldStr.indexOf('|昵称|') != -1 && fieldStr.indexOf('|昵称必填|') != -1){
			if ($id("realname").value==""){alert("请输入昵称（可以是QQ网名或称呼）");$id("realname").focus();return false;}
		}
		if (fieldStr.indexOf('|QQ|') != -1 && fieldStr.indexOf('|QQ必填|') != -1){
			if ($id("qq").value==""){alert("请输入QQ");$id("qq").focus();return false;}
			if ($id("qq").value.length < 5){alert("输入QQ号长度不能低于5位");$id("qq").focus();return false;}
		}
		if (fieldStr.indexOf('|微信|') != -1 && fieldStr.indexOf('|微信必填|') != -1){
			if ($id("weixin").value==""){alert("请输入微信");$id("weixin").focus();return false;}
		}
		if (fieldStr.indexOf('|旺旺|') != -1 && fieldStr.indexOf('|旺旺必填|') != -1){
			if ($id("ww").value==""){alert("请输入旺旺");$id("ww").focus();return false;}
		}
	}catch (e){}
	try {
		if (fieldStr.indexOf('|邀请人必填|') != -1 && $id("isRecomUser").value == 2){
			if ($id("recomUser").value==""){alert("请填写邀请人");$id("recomUser").focus();return false;}
		}
	}catch (e){}
	try {
		if ($name("isAgree")[0].checked==false){
			alert("只有同意注册协议规定，才可提交注册。");$name("isAgree")[0].focus();return false;
		}
	}catch (e){}
	try {
		if ($id("verCodeBox").style.display==""){
			if (SYS_verCodeMode == 20){
				if ($("input[name='geetest_challenge']").val() == "") {
					alert('请点击验证码按钮进行验证');return false;
				}
			}else{
				if ($id("verCode").value==""){alert("验证码不能为空.");$id("verCode").focus();return false;}
			}
		}
	}catch (e){}

	if (waitSec>0){
		alert("已提交，请稍等一会儿...("+ waitSec +")");return false;
	}
	waitSec = 10;
	cutWaitFunc = window.setInterval("CutWaitSec()",1000);

	ShowMengceng('正在注册中，请等待...',12);

	// EncPwdData('userpwd');

//	if (webPathPart=="../"){ $id('regForm').action = webPathPart + $id('regForm').action; }
	AjaxPostDeal("regForm");
	return false;
}

function CutWaitSec(){
	if (waitSec<=0){
		window.clearInterval(cutWaitFunc);
		return false;
	}else{
		waitSec --;
	}
}



// 登录表单检测
function CheckLoginForm(){
	if ($id("loginMode").value=="phone"){
		if ($id("phone").value==""){alert("手机号不能为空！");$id("phone").focus();return false;}
		if (! IsPhone($id("phone").value)){alert("手机号格式错误，长度11位！");$id("phone").focus();return false;}

	}else if ($id("loginMode").value=="mail"){
		if ($id("mail").value==""){alert("邮箱不能为空！");$id("mail").focus();return false;}
		if (! IsMail($id("mail").value)){alert("邮箱格式错误！");$id("mail").focus();return false;}

	}else{
		if ($id("username").value==""){alert("用户名不能为空！");$id("username").focus();return false;}
	}

	if ($id("loginPwd").value=="phone"){
		if ($id("phoneCode").value==""){alert("短信验证码不能为空.");$id("phoneCode").focus();return false;}

	}else if ($id("loginPwd").value=="mail"){
		if ($id("mailCode").value==""){alert("邮件验证码不能为空.");$id("mailCode").focus();return false;}

	}else{
		if ($id("userpwd").value==""){alert("密码不能为空！");$id("userpwd").focus();return false;}

	}
	try {
		if ($id("verCodeBox").style.display==""){
			if (SYS_verCodeMode == 20){
				if ($("input[name='geetest_challenge']").val() == "") {
					alert('请点击验证码按钮进行验证');return false;
				}
			}else{
				if ($id("verCode").value==""){alert("验证码不能为空.");$id("verCode").focus();return false;}
			}
		}
	}catch (e){}

	ShowMengceng('正在登录中，请等待...',8);

	// EncPwdData('userpwd');

//	if (webPathPart=="../"){ $id('loginForm').action = webPathPart + $id('loginForm').action; }
	AjaxPostDeal("loginForm");
	return false;
}

// 微信公众号扫码登录检测
function CheckWxmpLoginState(code,mode){
	AjaxGetDeal('plugin_deal.php?m=wxmpLogin&mode=ajax&code='+ encodeURIComponent(code) +'&mode='+ mode);
}

function RunCheckLoginState(enStr){
	waitSec = 90;
	cutWaitFunc = window.setInterval("CutWaitSec2('"+ enStr +"')",1000);

}

function CutWaitSec2(enStr){
	if (waitSec==90 || waitSec==82 || waitSec==76 || waitSec==70 || waitSec==64 || waitSec==56 || waitSec==48 || waitSec==38 || waitSec==28 || waitSec==18){
		// $id('tt2').innerHTML = waitSec +"/"+ enStr;
		CheckWxmpLoginState(enStr,"noAlert");
	}
	if (waitSec<=18){
		window.clearInterval(cutWaitFunc);
		return false;
	}else{
		waitSec --;
	}
}


// 检测快捷登录注册表单
function CheckLoginApiRegForm(){
	if ($id("judRegCode").value=="1"){
		if ($id("regCode").value==""){alert("注册邀请码不能为空！");$id("regCode").focus();return false;}
	}
	if ($id("username").value==""){alert("用户名不能为空！");$id("username").focus();return false;}
	try{
		var fieldStr = $id('regFieldStr').value;
		if (fieldStr.indexOf('|邮箱|') != -1){
			if (fieldStr.indexOf('|邮箱必填|') != -1){
				if ($id("mail").value.length == 0){alert("请输入邮箱！");$id("mail").focus();return false;}
				if (! IsMail($id("mail").value)){alert("邮箱格式错误！");$id("mail").focus();return false;}
				try {
					if ($id("mailCode").value==""){alert("邮件验证码不能为空.");$id("mailCode").focus();return false;}
				}catch (e){}
			}
		}
		if (fieldStr.indexOf('|手机|') != -1){
			if (fieldStr.indexOf('|手机必填|') != -1){
				if ($id("phone").value.length == 0){alert("请输入手机");$id("phone").focus();return false;}
				if (! IsPhone($id("phone").value)){alert("手机号格式错误，长度11位！");$id("phone").focus();return false;}
				try {
					if ($id("phoneCode").value==""){alert("短信验证码不能为空.");$id("phoneCode").focus();return false;}
				}catch (e){}
			}
		}
		if (fieldStr.indexOf('|昵称|') != -1 && fieldStr.indexOf('|昵称必填|') != -1){
			if ($id("realname").value==""){alert("请输入昵称（可以是QQ网名或称呼）");$id("realname").focus();return false;}
		}
		if (fieldStr.indexOf('|QQ|') != -1 && fieldStr.indexOf('|QQ必填|') != -1){
			if ($id("qq").value==""){alert("请输入QQ");$id("qq").focus();return false;}
			if ($id("qq").value.length < 5){alert("输入QQ号长度不能低于5位");$id("qq").focus();return false;}
		}
		if (fieldStr.indexOf('|微信|') != -1 && fieldStr.indexOf('|微信必填|') != -1){
			if ($id("weixin").value==""){alert("请输入微信");$id("weixin").focus();return false;}
		}
		if (fieldStr.indexOf('|旺旺|') != -1 && fieldStr.indexOf('|旺旺必填|') != -1){
			if ($id("ww").value==""){alert("请输入旺旺");$id("ww").focus();return false;}
		}
	}catch (e){}
	try {
		if (SYS_verCodeMode == 20){
			if ($("input[name='geetest_challenge']").val() == "") {
				alert('请点击验证码按钮进行验证');return false;
			}
		}else{
			if ($id("verCode").value==""){alert("验证码不能为空.");$id("verCode").focus();return false;}
		}
	}catch (e){}

	if (waitSec>0){
		alert("已提交，请稍等一会儿...("+ waitSec +")");return false;
	}
	waitSec = 10;
	cutWaitFunc = window.setInterval("CutWaitSec()",1000);

	ShowMengceng('正在快捷注册中，请等待...',12);

	AjaxPostDeal("regForm");
	return false;
}


// 页面登录表单检测
function CheckLoginHomeForm(){
	if ($id("usernameHome").value==""){alert("用户名不能为空！");$id("usernameHome").focus();return false;}
	if ($id("userpwdHome").value==""){alert("密码不能为空！");$id("userpwdHome").focus();return false;}
	try {
		if ($id("verCodeHomeK").style.display==""){
			if (SYS_verCodeMode == 20){
				if ($("input[name='geetest_challenge']").val() == "") {
					alert('请点击验证码按钮进行验证');return false;
				}
			}else{
				if ($id("verCode").value==""){alert("验证码不能为空.");$id("verCode").focus();return false;}
			}
		}
	}catch (e){}

//	if (webPathPart=="../"){ $id('loginForm').action = webPathPart + $id('loginForm').action; }
	AjaxPostDeal("loginHomeForm");
	return false;
}



// 忘记密码——查找方式
function MissPwdType(){
	$id('usernameBox').style.display = 'none';
	$id('mailBox').style.display = 'none';
	$id('phoneBox').style.display = 'none';
	try{
		if ($id('refType_username').checked){
			$id('usernameBox').style.display = '';
		}
	}catch (e){}
	try{
		if ($id('refType_mail').checked){
			$id('mailBox').style.display = '';
		}
	}catch (e){}
	try{
		if ($id('refType_phone').checked){
			$id('phoneBox').style.display = '';
		}
	}catch (e){}
}



// 忘记密码——用户名、邮箱、手机查找
function MissPwdSend(){
	try{
		if ($id('refType_username').checked){
			refType = $id('refType_username').value;;
			if ($id('username').value == ""){ alert("用户名不能为空。");$id('username').focus();return false; }

		}
	}catch (e){}
	try{
		if ($id('refType_mail').checked){
			refType = $id('refType_mail').value;;
			if ($id('mail').value == ""){ alert("邮箱不能为空。");$id('mail').focus();return false; }
			if (! IsMail($id("mail").value)){alert("邮箱格式错误！");$id("mail").focus();return false;}
		}
	}catch (e){}
	try{
		if ($id('refType_phone').checked){
			refType = $id('refType_phone').value;;
			if ($id('phone').value == ""){ alert("手机号不能为空。");$id('phone').focus();return false; }
			if (! IsPhone($id("phone").value)){alert("手机号格式错误，长度11位！");$id("phone").focus();return false;}
		}
	}catch (e){}

	try {
		if (SYS_verCodeMode == 20){
			if ($("input[name='geetest_challenge']").val() == "") {
				alert('请点击验证码按钮进行验证');return false;
			}
		}else{
			if ($id("verCode").value==""){alert("验证码不能为空.");$id("verCode").focus();return false;}
		}
	}catch (e){}

	document.getElementById("missForm").action = "users_deal.php?mudi=missPwdSend";
	formNameObj = document.getElementById("missForm");
	var formNameUrl = formNameObj.getAttribute("action"), formNameContent = formValueToStr(formNameObj);
	$.post(formNameUrl,formNameContent,function(result){
		if (result.indexOf("反馈成功") >= 0){
			document.getElementById("refStr").innerHTML = "";
		}
		if (result.indexOf(">alert(\"") >= 0){
			eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
		}else{
			document.getElementById("questionStr").innerHTML = result;
			AjaxAddiEvent(result,"geetest")
		}
	});
	return false;

	/*
	$.ajaxSetup({cache:false});
	$.get(webPathPart +"users_deal.php?mudi=missPwdSend&refType="+ encodeURIComponent(refType) +"&username="+ encodeURIComponent($id('username').value) +"&mail="+ encodeURIComponent($id('mail').value) +"&phone="+ encodeURIComponent($id('phone').value), function(result){
		if (result.indexOf("反馈成功") >= 0){
			document.getElementById("refStr").innerHTML = "";
		}
		if (result.indexOf(">alert(\"") >= 0){
			eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
		}else{
			document.getElementById("questionStr").innerHTML = result;
			AjaxAddiEvent(result,"geetest")
		}
	});
	*/
}



// 忘记密码——表单检测
function CheckMissPwdForm(){
	try{
		if ($id('refType_username').checked){
			if (! $id("userID")){ return false; }
			if ($id("userID").value=="" || $id("userID").value=="0"){alert("指定用户错误！");return false;}
			if ($id("answer").value==""){alert("密保答案不能为空！");$id("answer").focus();return false;}
		}
	}catch (e){}

	try{
		if ($id('refType_mail').checked){
			uid = 0;
			for (var i=0; i<$name("userID").length; i++){
				if ($name("userID")[i].checked){
					uid = $name("userID")[i].value; break;
				}
			}
			if (uid==0){alert("请选择要发送邮件验证码的账号！");return false;}
			if ($id("mailCode").value==""){alert("邮件验证码不能为空！");$id("mailCode").focus();return false;}
		}
	}catch (e){}

	try{
		if ($id('refType_phone').checked){
			uid = 0;
			for (var i=0; i<$name("userID").length; i++){
				if ($name("userID")[i].checked){
					uid = $name("userID")[i].value; break;
				}
			}
			if (uid==0){alert("请选择要发送手机短信验证码的账号！");return false;}
			if ($id("phoneCode").value==""){alert("短信验证码不能为空！");$id("phoneCode").focus();return false;}
		}
	}catch (e){}

	if ($id("userpwd").value==""){alert("新密码不能为空！");$id("userpwd").focus();return false;}
	if ($id("userpwd").value.length<6){alert("新密码长度不能少于6位！");$id("userpwd").focus();return false;}
	if ($id("userpwd").value!=$id("userpwd2").value){alert("新密码不一致！");$id("userpwd2").focus();return false;}

	try {
		if (SYS_verCodeMode == 20){
			if ($("input[name='geetest_challenge']").val() == "") {
				alert('请点击验证码按钮进行验证');return false;
			}
		}else{
			if ($id("verCode").value==""){alert("验证码不能为空.");$id("verCode").focus();return false;}
		}
	}catch (e){}

//	if (webPathPart=="../"){ $id('missForm').action = webPathPart + $id('missForm').action; }
	document.getElementById("missForm").action = "users_deal.php?mudi=missPwd";
	AjaxPostDeal("missForm");
	return false;
}


// 忘记密码——发送邮件
function SendMissMail(userID){
	try {
		document.getElementById("loadingStr").innerHTML = "<span style='font-size:14px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />"+ ajaxDealStr +"</span>";
	}catch (e) {}

	AjaxGetDeal(webPathPart +"users_deal.php?mudi=missPwdMail&userID="+ userID);
}


// 及时检测用户名的合法性
function CheckUsername(username){
	$id("usernameStr").innerHTML="检测中...";
	$.ajaxSetup({cache:false});
	$.get(webPathPart +"users_deal.php?mudi=checkUsername&method=write&username="+ encodeURIComponent(username), function(result){
		$id("usernameStr").innerHTML=result;
		if (result.lastIndexOf('green')>=0){
			$id("usernameIsOk").innerHTML="<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		}else{
			$id("usernameIsOk").innerHTML="<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		}
	});

}


// 及时检测邀请人的合法性
function CheckRecomUser(username){
	AjaxGetDeal(webPathPart +"users_deal.php?mudi=checkRecomUser&method=write&username="+ encodeURIComponent(username));
}


// 及时检测密码的合法性
function CheckUserPwd(){
	if ($id("userpwd").value.length>=6){
		$id("userpwdIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("userpwdStr").style.display = "none";
	}else{
		$id("userpwdIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("userpwdStr").style.display = "";
		$id("userpwdStr").innerHTML = "长度不足6位，当前长度："+ $id("userpwd").value.length +"";
		return false;
	}
}


// 及时检测确认密码的合法性
function CheckUserPwd2(){
	if ($id("userpwd2").value==""){
		$id("userpwd2IsOk").innerHTML = "";
		$id("userpwd2Str").style.display = "none";
		return false;
	}
	if ($id("userpwd").value.length==$id("userpwd2").value.length){
		$id("userpwd2IsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("userpwd2Str").style.display = "none";
	}else{
		$id("userpwd2IsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("userpwd2Str").style.display = "";
		$id("userpwd2Str").innerHTML = "两次密码输入不一致";
		return false;
	}
}


// 及时检测昵称的合法性
function CheckNickname(){
	if (Str_IsSign($id("nickname").value)==false){
		$id("nicknameIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("nicknameStr").style.display = "none";
	}else{
		$id("nicknameIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("nicknameStr").style.display = "";
		$id("nicknameStr").innerHTML = "含不符合要求的字符";
		return false;
	}
}


// 及时检测问题的合法性
function CheckQuestion(){
	if (Str_IsSign($id("question").value)==false){
		$id("questionIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("questionStr").style.display = "none";
	}else{
		$id("questionIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("questionStr").style.display = "";
		$id("questionStr").innerHTML = "含不符合要求的字符";
		return false;
	}
	if (Str_Byte($id("question").value)>=2 && Str_Byte($id("question").value)<=50){
		$id("questionIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("questionStr").style.display = "none";
	}else{
		$id("questionIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("questionStr").style.display = "";
		$id("questionStr").innerHTML = "长度请在2~50字节范围内";
		return false;
	}
}


// 及时检测问题答案的合法性
function CheckAnswer(){
	if (Str_Byte($id("answer").value)>=2 && Str_Byte($id("answer").value)<=50){
		$id("answerIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("answerStr").style.display = "none";
	}else{
		$id("answerIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("answerStr").style.display = "";
		$id("answerStr").innerHTML = "长度请在2~50字节范围内";
		return false;
	}
}


// 登录模式切换
function LoginModeTab(str){
	$id('loginMode').value = str;
	LoginInputBtn($id('loginPwd').value +'Pwd');

	var modeStr = 'username';
	if ($id('login_'+ modeStr)){
		if (str == modeStr){
			$('#login_'+ modeStr).removeClass('pointItem');
			$('#login_'+ modeStr).addClass('pointCurr');
			$('#input_'+ modeStr).css('display','');
			$id(modeStr).focus();
		}else{
			$('#login_'+ modeStr).removeClass('pointCurr');
			$('#login_'+ modeStr).addClass('pointItem');
			$('#input_'+ modeStr).css('display','none');
		}
	}

	modeStr = 'phone';
	if ($id('login_'+ modeStr)){
		if (str == modeStr){
			$('#login_'+ modeStr).removeClass('pointItem');
			$('#login_'+ modeStr).addClass('pointCurr');
			$('#input_'+ modeStr).css('display','');
			if ($id('loginPhoneMode').value == 2){ $('#btn_'+ modeStr +'Code').css('display',''); }
			$id(modeStr).focus();
		}else{
			$('#login_'+ modeStr).removeClass('pointCurr');
			$('#login_'+ modeStr).addClass('pointItem');
			$('#input_'+ modeStr).css('display','none');
			if ($id('loginPhoneMode').value == 2){ $('#btn_'+ modeStr +'Code').css('display','none'); }
		}
	}

	modeStr = 'mail';
	if ($id('login_'+ modeStr)){
		if (str == modeStr){
			$('#login_'+ modeStr).removeClass('pointItem');
			$('#login_'+ modeStr).addClass('pointCurr');
			$('#input_'+ modeStr).css('display','');
			if ($id('loginMailMode').value == 2){ $('#btn_'+ modeStr +'Code').css('display',''); }
			$id(modeStr).focus();
		}else{
			$('#login_'+ modeStr).removeClass('pointCurr');
			$('#login_'+ modeStr).addClass('pointItem');
			$('#input_'+ modeStr).css('display','none');
			if ($id('loginMailMode').value == 2){ $('#btn_'+ modeStr +'Code').css('display','none'); }
		}
	}
}


// 登录模式切换
function LoginInputBtn(str){
	switch (str){
		case 'mailPwd':
			$id('input_mailCode').style.display = 'none';
			$id('input_pwd').style.display = '';
			$id('loginPwd').value = 'pwd';
			break;
	
		case 'mailCode':
			$id('input_mailCode').style.display = '';
			$id('input_pwd').style.display = 'none';
			$id('loginPwd').value = 'mail';
			break;
	
		case 'phonePwd':
			$id('input_phoneCode').style.display = 'none';
			$id('input_pwd').style.display = '';
			$id('loginPwd').value = 'pwd';
			break;
	
		case 'phoneCode':
			$id('input_phoneCode').style.display = '';
			$id('input_pwd').style.display = 'none';
			$id('loginPwd').value = 'phone';
			break;
	
	}
}


// 会员退出  放在js/inc/common.js