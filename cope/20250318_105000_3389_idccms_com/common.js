// 获取元素id
function $id(str){
	return document.getElementById(str);
}

// 获取元素name
function $name(str){
	return document.getElementsByName(str);
}

// 把Option的text值覆盖toID文本框
// 应用例子 onchange="OptionTextTo('labItemID','labItemName');"
function OptionTextTo(sourceID,toID){
	document.getElementById(toID).value=document.getElementById(sourceID).options[document.getElementById(sourceID).selectedIndex].text;
}

// 获取下拉框的文本
function SelectGetText(selectName){
	return document.getElementById(selectName).options[document.getElementById(selectName).options.selectedIndex].text;
}

// 下拉框是否存在value值
function SelectValInArr(selectName,selVal){
	var jud = false;

	for (soi=0; soi<document.getElementById(selectName).options.length; soi++){
		if (selVal == document.getElementById(selectName).options[soi].value){ jud = true; return jud; }
	}
	return jud;
}

// 下拉框是否存在text值
function SelectTextInArr(selectName,selVal){
	var jud = false;

	for (soi=0; soi<document.getElementById(selectName).options.length; soi++){
		if (selVal == document.getElementById(selectName).options[soi].text){ jud = true; return jud; }
	}
	return jud;
}


// 判断是否含特殊符号
function Str_IsSign(str){
	var txt=new RegExp("[ ,\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,\"]");
	if (txt.test(str)){
		return true;
	}else{
		return false;
	}
}

// 计算字符串的字节数
function Str_Byte(str){
	var newStr = 0;
	// newStr=str.replace(/[^\u7F51\u949B\u5DE5\u4F5C\u5BA4]/g, '***');
	newStr=str.replace(/[^\u0000-\u00ff]/g, '***');
	return newStr.length;
}

function GetCookieStr(offset){
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

// 获取cookie信息
function GetCookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen){
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return GetCookieStr (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function GetCookie2(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

// 设置cookie信息
function SetCookie(name, value){
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var path = "/";
	var domain = "";
	var secure = (argc > 6) ? argv[6] : false;
	document.cookie = name +"=;expires="+(new Date(0)).toGMTString();
	document.cookie = name +"="+ encodeURIComponent(value)+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))+((secure == true) ? "; secure" : "");
}

function ToInt(str){
	var newInt = parseInt(str);
	if(isNaN(newInt)) { newInt = 0; }
	return newInt;
}

function ToFloat(str){
	var newFloat = parseFloat(str);
	if(isNaN(newFloat)) { newFloat = 0; }
	return newFloat;
}

function ToGetStr(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return unescape(r[2]); return '';
}

function ToGetPara(str,name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = (str +'').match(reg);
	if(r!=null)return unescape(r[2]); return '';
}

function ToPinYinId(fromId,toId,mode,space){
	if ($id(fromId).value == ''){
		alert('中文内容不能为空.');$id(fromId).focus();return false;
	}
	//var a=window.open('read.php?mudi=pinyin&str='+ $id(fromId).value +'&mode='+ mode +'&space='+ space);
	return AjaxGetDealToInput('read.php?mudi=pinyin&str='+ $id(fromId).value +'&mode='+ mode +'&space='+ space, toId, 'base64');
}

// 检测邮箱的合法性。
function IsMail(str){
	if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)!=-1){
		return true;
	}else{
		return false;
	}
}

// 检测手机号的合法性。
function IsPhone(str){
	if (str.search(/^\d{11}$/)!=-1){
		return true;
	}else{
		return false;
	}
}

// 检测文件框是否为图片文件
function IsImgFile(fileValue){
	var re = new RegExp("\.(gif|jpg|jpeg|png|bmp)","ig");
	return re.test(fileValue)
}

// 检测是否为http、https协议网址
function IsHttpUrl(urlStr){
	if (urlStr.substr(0,7).toLowerCase()=="http://" || urlStr.substr(0,8).toLowerCase()=="https://"){
		return true;
	}else{
		return false;
	}
}

function IsAbsUrl(urlStr){
	if (urlStr.substr(0,7).toLowerCase()=="http://" || urlStr.substr(0,8).toLowerCase()=="https://" || urlStr.substr(0,1)=="/"){
		return true;
	}else{
		return false;
	}
}

function FiltHtmlTag(str) {
	str = str.replace(/<\/?[^>]*>/g,'');			// 去除HTML tag
	str = str.replace(/(\t|\r|\n| |\&nbsp;|\&ensp;)/g,'');	// 去除空格、换行、制表符
	return str;
}


// 过滤字符串
// 应用例子 onkeyup="if (this.value!=FiltChar(this.value)){this.value=FiltChar(this.value)}"
// 应用例子 onkeyup="this.value=FiltChar(this.value)"
function FiltChar(str){
	return str.replace(/[^\w\u4E00-\u9FA5]/g, '');
}

// 过滤小数
// 应用例子 onkeyup="if (this.value!=FiltDecimal(this.value)){this.value=FiltDecimal(this.value)}"
// 应用例子 onkeyup="this.value=FiltDecimal(this.value)"
function FiltDecimal(str){
	return str.replace(/[^\d*\.?\d{0,2}$]/g,'')
}

// 过滤小数保留2位小数
// 应用例子 onkeyup="if (this.value!=FiltDecimal2(this.value)){this.value=FiltDecimal2(this.value)}"
// 应用例子 onkeyup="this.value=FiltDecimal2(this.value)"
function FiltDecimal2(str){
	return str.replace(/(^\d*\.?\d{0,2}).*/g,'$1')
}

// 过滤整数
// 应用例子 onkeyup="if (this.value!=FiltInt(this.value)){this.value=FiltInt(this.value)}"
// 应用例子 onkeyup="this.value=FiltInt(this.value)"
function FiltInt(str){
	return str.replace(/\D/g,'')
}

// 过滤非数字、字母
// 应用例子 onkeyup="if (this.value!=FiltABCNum(this.value)){this.value=FiltABCNum(this.value)}"
// 应用例子 onkeyup="this.value=FiltABCNum(this.value)"
function FiltABCNum(str){
	return str.replace(/[^A-Za-z0-9]/ig,'')
}

// 过滤非数字、字母、下划线
// 应用例子 onkeyup="if (this.value!=FiltAbcNum_(this.value)){this.value=FiltAbcNum_(this.value)}"
// 应用例子 onkeyup="this.value=FiltAbcNum_(this.value)"
function FiltAbcNum_(str){
	return str.replace(/[^A-Za-z0-9_]/ig,'')
}

// 生成随机数
// num：生成个数
function RndNum(num) {
	var a = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	var b = "", c;
	for(i=1; i<=num; i++){
		c = Math.floor(Math.random() * a.length);
		b = b + a[c];
		// a = a.del(c);
	}
	return b;
}

// 生成随机数
// num：生成个数；type：num数字，abc小写字母，ABC大写字母
function RndNum2(num,type) {
	var a;
	if (type == 'num'){
		a = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
	}else if (type == 'abc'){
		a = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
	}else if (type == 'ABC'){
		a = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	}else{
		a = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	}
	var b = "", c;
	for(i=1; i<=num; i++){
		c = Math.floor(Math.random() * a.length);
		b = b + a[c];
	}
	return b;
}

// idc随机密码
function IdcRndPwd(type){
	return RndNum2(4,'ABC') + RndNum2(4,'num');
}

// 加载JS文件
function LoadJsFile(fileId,filePath,mode){
	var scriptTag = document.getElementById(fileId);
	var headObj = document.getElementsByTagName('head').item(0);
	if(scriptTag){
		if (mode==1){
			headObj.removeChild(scriptTag);
			jsFile = document.createElement('script');
			jsFile.src = filePath;
			jsFile.type = 'text/javascript';
			// jsFile.defer = 'defer';
			jsFile.id = fileId;
			if (fileId == 'ueditorJs1' || fileId == 'ueditorJs2' || fileId == 'ueditorJs3'){
				jsFile.charset = 'gbk';
			}
			headObj.appendChild(jsFile);
		}
	}else{
		jsFile = document.createElement('script');
		jsFile.src = filePath;
		jsFile.type = 'text/javascript';
		// jsFile.defer = 'defer';
		jsFile.id = fileId;
		if (fileId == 'ueditorJs1' || fileId == 'ueditorJs2' || fileId == 'ueditorJs3'){
			jsFile.charset = 'gbk';
		}
		headObj.appendChild(jsFile);
	}
}

// 加载CSS文件
function LoadCssFile(fileId,filePath,mode){
	var cssTag = document.getElementById(fileId);
	var headObj = document.getElementsByTagName('head').item(0);
	if(cssTag){
		if (mode==1){
			headObj.removeChild(cssTag);
			cssFile = document.createElement('link');
			cssFile.href = filePath;
			cssFile.rel = 'stylesheet';
			cssFile.type = 'text/css';
			cssFile.id = fileId;
			headObj.appendChild(cssFile);
		}
	}else{
		cssFile = document.createElement('link');
		cssFile.href = filePath;
		cssFile.rel = 'stylesheet';
		cssFile.type = 'text/css';
		cssFile.id = fileId;
		headObj.appendChild(cssFile);
	}
}

// 点击开启隐藏区，再点击隐藏
function ClickShowHidden(idStr){
	if ($id(idStr).style.display == ''){
		$id(idStr).style.display = 'none';
	}else{
		$id(idStr).style.display = '';
	}
	try {
		WindowHeight(0);
	}catch (e) {}
}


// 数组变量获取下拉框全部选项
function SelectOptionArr(selectName){
	var SelectOptionArray = new Array();

	for (soi=0; soi<document.getElementById(selectName).options.length; soi++){
		SelectOptionArray['OT'+ document.getElementById(selectName).options[soi].value] = document.getElementById(selectName).options[soi].text;
	}
	return SelectOptionArray;
}

// 下拉框内容检索
function SelectOptionSearch(sourceID,selectName,arrObj){
	document.getElementById(selectName).options.length=0;
	for (var key in arrObj){
		newKey = key.substr(0,2);
		if (newKey == "OT"){ newKey = key.substr(2); }else{ newKey = key; }
		if (arrObj[key].lastIndexOf(document.getElementById(sourceID).value)>=0){
			document.getElementById(selectName).options.add(new Option(arrObj[key],newKey));
		}
	}
}

// 清理下拉框内容
function SelectOptionClear(selectName,defText){
	document.getElementById(selectName).options.length=0; 
	document.getElementById(selectName).options.add(new Option(defText,""));
	document.getElementById(selectName).value = "";
}

// 光标待的地方添加字符串
function FocusAddText(inputId,str){
	var ubb=document.getElementById(inputId);
	var ubbLength=ubb.value.length;
	ubb.focus();
	if(typeof document.selection !="undefined"){
		document.selection.createRange().text=str;
	}else{
		ubb.value=ubb.value.substr(0,ubb.selectionStart)+str+ubb.value.substring(ubb.selectionStart,ubbLength);
	}
}

// 复制内容(获取ID所在的value)
function ValueToCopy(id){
	copy = $id(id).value
	if (window.clipboardData){
		window.clipboardData.setData("Text", copy);
	}else if(navigator.userAgent.indexOf("Opera") != -1){
		window.location = copy;
	}else if(window.netscape){
		try {
			netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
		}catch (e){
			alert("你使用的FireFox浏览器,复制功能被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车。\n然后将“signed.applets.codebase_principal_support”双击，设置为“true”");
			return;
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1']
				.createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1']
				.createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"]
				.createInstance(Components.interfaces.nsISupportsString);
		str.data = copy;
		trans.setTransferData("text/unicode", str, copy.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
	}else{
		alert("你的浏览器不支持一键复制功能");
		return;
	}
	alert("复制成功")
	return false;
}

// webPathPart变形
function WppSign(str){
	return str.replace(/\.\.\//g,"a");
}

if (typeof(webPathPart) == "undefined"){
	try { console.log("[webPathPart]未定义"); }catch(e){}
	webPathPart = "";
}
if (typeof(SYS_verCodeMode)=="undefined"){
	try { console.log("[SYS_verCodeMode]未定义"); }catch(e){}
	SYS_verCodeMode = 1;
}
if (typeof(isMobile)=="undefined"){
	try { console.log("[isMobile]未定义"); }catch(e){}
	isMobile = 0;
}

// 通用Ajax提交表单
function CheckAjaxForm(formName){
	AjaxPostDeal(formName);
	return false;
}

// Ajax导航链接
function AjaxNavHref(){
	var outputID = arguments[0] ? arguments[0] : "";
	var urlStr = arguments[1] ? arguments[1] : "";
	var pageNum = arguments[2] ? arguments[2] : "";

	if (outputID==""){ outputID="dialogBody"; }
	if (urlStr==""){ urlStr=document.location.href; }
	if (! isNaN(parseInt(pageNum))){ pageNum="&page="+ pageNum; }else{ pageNum=""; }

	document.getElementById(outputID).innerHTML="<br /><br /><center style='font-size:14px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />数据加载中...</center><br /><br />";
	$.ajaxSetup({cache:false});
	$.get(webPathPart + urlStr + pageNum, function(result){
		document.getElementById(outputID).innerHTML=result;
		try {
			backNavBtn = document.getElementById("backAjaxNavHeader").href;
			if (backNavBtn.indexOf ("#")!=-1){
				webCurrUrl = document.location.href;
				if (webCurrUrl.indexOf ("#")>-1){
					webCurrUrl=webCurrUrl.substring(0,webCurrUrl.lastIndexOf("#"));
				}
				webCurrUrl=webCurrUrl +"#"+ backNavBtn.substring(backNavBtn.lastIndexOf("#")+1,backNavBtn.length);
				document.getElementById("backAjaxNavHeader").href = webCurrUrl;
				setTimeout("document.getElementById('backAjaxNavHeader').click();",300);
			}
		}catch (e) {}
	});
}

// 分页链接
function ListPageHref(pageNum,mode1Url){
	if (pageNum<2){
		pageUrl = mode1Url.replace("_[page]","").replace("[page]",pageNum);
		if (pageUrl.substr(pageUrl.length-10)=="index.html"){ pageUrl = pageUrl.substr(0,pageUrl.length-10); }
		document.location.href=pageUrl;
	}else{
		document.location.href=mode1Url.replace("[page]",pageNum);
	}
}

// 分页链接2
function ListPageHref2(pageNum,maxPage,mode1Url,mode1Url2){
	if (pageNum < 2){
		pageUrl = mode1Url.replace("_[page]","").replace("[page]",pageNum);
		if (pageUrl.substr(pageUrl.length-10)=="index.html"){ pageUrl = pageUrl.substr(0,pageUrl.length-10); }
		document.location.href=pageUrl;
	}else{
		if (maxPage > 0 && pageNum > maxPage){
			mode1Url = mode1Url2;
		}
		document.location.href=mode1Url.replace("[page]",pageNum);
	}
}


ajaxDealStr = "数据处理中...";
ajaxLoadStr = "数据读取中...";

// POST表单AJAX处理
function AjaxPostDeal(formName){
	try {
		document.getElementById("loadingStr").innerHTML = "<span style='font-size:14px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />"+ ajaxDealStr +"</span>";
	}catch (e) {}

	formNameObj = document.getElementById(formName);
	var formNameUrl = formNameObj.getAttribute("action"), formNameContent = formValueToStr(formNameObj);
	$.post(formNameUrl,formNameContent,function(result){
		try {
			document.getElementById("loadingStr").innerHTML = "";
		}catch (e) {}
		eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
		try {
			document.getElementById("loadingStr").innerHTML = "";
		}catch (e) {}
	});
	return false;
}

// 通过表单name获取该表单所有元素并组成GET字符串
function formValueToStr(formObj) {
	var qstr = "", and = "", elem, value;
	for(var i = 0; i< formObj.length; ++i) {
		elem = formObj[i];
		if (elem.name!='') {
			value=undefined;
			switch(elem.type) {
				case "select-one":
					if(elem.selectedIndex > -1) {
						value = elem.options[elem.selectedIndex].value;
					}
					else {
						value = "";
					}
					break;
				case"select-multiple":
					var selMul=elem.options;
					for(var w=0;w<selMul.length;++w){
						if(selMul[w].selected){
							qstr += and+elem.name +"="+ encodeURIComponent(selMul[w].value);
							and = "&";
						}
					}
					break;
				case "checkbox":
				case "radio":
					if (elem.checked == true) {
						value = elem.value;
					}
					break;
				default:
					value = elem.value;
			}
			if(value!=undefined){
				value = encodeURIComponent(value);
				qstr += and + elem.name + "=" + value;
				and = "&";
			}
		}
	}
	return qstr;
}

// GET提交AJAX处理
function AjaxGetDeal(urlStr){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
	});
	return false;
}

// GET提交AJAX处理
function AjaxGetDealToAlert(urlStr){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		alert(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,""));
	});
	return false;
}

// GET提交AJAX处理返回值到input标签里
function AjaxGetDealToInput(urlStr, outputID, dealMode){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		if (dealMode == 'base64'){ result = base64decode(result); }
		document.getElementById(outputID).value = result;
		try{
			WindowHeight(0);
		}catch (e){}
	});
	return false;
}

// GET提交AJAX处理返回值到id标签下
function AjaxGetDealToId(urlStr,outputID,addiEvent){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		document.getElementById(outputID).innerHTML = result;
		AjaxAddiEvent(result,addiEvent)
	});

	return false;
}

// GET提交AJAX处理
function AjaxGetDealToIdNo(urlStr,outputID,badWords){
	$.ajaxSetup({cache:false});
	$.get(urlStr, function(result){
		if (result.lastIndexOf(badWords)!=-1){
			eval(result.replace(/<(script[^>]*?)>/gi,"").replace(/<\/script.*?>/gi,"").replace(/(<meta[^>]*>|<\/meta>)/gi,""));
		}else{
			document.getElementById(outputID).innerHTML = result;
		}
	});
	return false;
}


// Ajax附加事件
function AjaxAddiEvent(str,addiEvent){
	if (typeof(addiEvent)=="undefined"){
		try { console.log("[addiEvent]未定义"); }catch(e){}
		addiEvent = '';
	}
	if (addiEvent.indexOf('video') != -1){
		try {
			LoadVideoFile(str);
		}catch (e) {}
	}else if (addiEvent.indexOf('geetest') != -1){
		try {
			if (SYS_verCodeMode == 20){
				LoadJsFile('geetestJs',webPathPart +'tools/geetest/gt.js?v=1.0',1);
			}
		}catch (e) {}
	}else if (addiEvent.indexOf('vote') != -1){
		try {
			VoteStyle();
		}catch (e) {}
	}
}


/* JS版base64编解码算法。示例:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
var base64EncodeChars = [
	"A", "B", "C", "D", "E", "F", "G", "H",
	"I", "J", "K", "L", "M", "N", "O", "P",
	"Q", "R", "S", "T", "U", "V", "W", "X",
	"Y", "Z", "a", "b", "c", "d", "e", "f",
	"g", "h", "i", "j", "k", "l", "m", "n",
	"o", "p", "q", "r", "s", "t", "u", "v",
	"w", "x", "y", "z", "0", "1", "2", "3",
	"4", "5", "6", "7", "8", "9", "+", "/"
];

var base64DecodeChars = [
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
];

function base64encode(str) {
	var out, i, j, len;
	var c1, c2, c3;

	len = str.length;
	i = j = 0;
	out = [];
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len)
		{
			out[j++] = base64EncodeChars[c1 >> 2];
			out[j++] = base64EncodeChars[(c1 & 0x3) << 4];
			out[j++] = "==";
			break;
		}
		c2 = str.charCodeAt(i++) & 0xff;
		if (i == len)
		{
			out[j++] = base64EncodeChars[c1 >> 2];
			out[j++] = base64EncodeChars[((c1 & 0x03) << 4) | ((c2 & 0xf0) >> 4)];
			out[j++] = base64EncodeChars[(c2 & 0x0f) << 2];
			out[j++] = "=";
			break;
		}
		c3 = str.charCodeAt(i++) & 0xff;
		out[j++] = base64EncodeChars[c1 >> 2];
		out[j++] = base64EncodeChars[((c1 & 0x03) << 4) | ((c2 & 0xf0) >> 4)];
		out[j++] = base64EncodeChars[((c2 & 0x0f) << 2) | ((c3 & 0xc0) >> 6)];
		out[j++] = base64EncodeChars[c3 & 0x3f];
	}
	return out.join('');
}

function base64decode(str) {
	var c1, c2, c3, c4;
	var i, j, len, out;

	len = str.length;
	i = j = 0;
	out = [];
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1) break;

		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1) break;

		out[j++] = String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return out.join('');
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) break;

		out[j++] = String.fromCharCode(((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));

		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return out.join('');
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) break;
		out[j++] = String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out.join('');
}

function StrToB2(str) {
	return base64encode(base64encode(str));
}

function B2ToStr(str) {
	return base64decode(base64decode(str));
}

function PcWapShow(pcStr, wapStr){
	if (isMobile == 1){
		return wapStr;
	}else{
		return pcStr;
	}
}

function PcWapParDir(){
	return PcWapShow('../../', '../');
}


// 检测邮箱的合法性
function CheckMail(){
	try{
		if ($id("mail").value == ''){
			$id("mailIsOk").innerHTML = "";
			$id("mailStr").style.display = "none";
		}else if (IsMail($id("mail").value)){
			$id("mailIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
			$id("mailStr").style.display = "none";
		}else{
			$id("mailIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
			$id("mailStr").style.display = "";
			$id("mailStr").innerHTML = "邮箱格式错误！";
		}
	}catch (e){}
}

// 发送邮件按钮倒计时
var mailSec = 0;
var mailCalcFunc;
function MailBtnCalc(btnId,sec){
	$id(btnId).disabled = true;
	mailSec = sec;
	$id(btnId).value = ""+ mailSec +"秒后重试";
	mailCalcFunc = window.setInterval("CutMailCalc('"+ btnId +"')",1000);
}

function CutMailCalc(btnId){
	if (mailSec<=0){
		window.clearInterval(mailCalcFunc);
		$id(btnId).disabled = false;
		$id(btnId).value = "发送验证码";
		return false;
	}else{
		mailSec --;
		$id(btnId).value = ""+ mailSec +"秒后重试";
	}
}

// 发送邮件验证码
function SendMailCode(btnId,mailId,type,userId){
	var mailStr = $id(mailId).value;
	if (mailStr==""){
		alert("请先输入邮箱！");
		try{ $id(mailId).focus(); }catch (e){}
		return false;
	}
	if (! IsMail(mailStr)){
		alert("邮箱格式错误！");
		try{ $id(mailId).focus(); }catch (e){}
		return false;
	}

	var userStr = '';
	if (userId.length > 0 && $id(userId)){
		userStr = $id(userId).value;
	}

	$id(btnId).value = "处理中...";
	AjaxGetDeal(webPathPart +'users_deal.php?mudi=mailSend&type='+ type +'&btnId='+ btnId +'&mail='+ mailStr +'&username='+ userStr);
}


// 检测手机号的合法性
function CheckPhone(){
	if ($id("phone").value == ''){
		$id("phoneIsOk").innerHTML = "";
		$id("phoneStr").style.display = "none";
	}else if (IsPhone($id("phone").value)){
		$id("phoneIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_yes.gif' />";
		$id("phoneStr").style.display = "none";
	}else{
		$id("phoneIsOk").innerHTML = "<img src='"+ webPathPart +"inc_img/share_no.gif' />";
		$id("phoneStr").style.display = "";
		$id("phoneStr").innerHTML = "手机号格式错误！";
	}
}

// 发送短信按钮倒计时
var phoneSec = 0;
var phoneCalcFunc;
function PhoneBtnCalc(btnId,sec){
	$id(btnId).disabled = true;
	phoneSec = sec;
	$id(btnId).value = ""+ phoneSec +"秒后重试";
	phoneCalcFunc = window.setInterval("CutPhoneCalc('"+ btnId +"')",1000);
}

function CutPhoneCalc(btnId){
	if (phoneSec<=0){
		window.clearInterval(phoneCalcFunc);
		$id(btnId).disabled = false;
		$id(btnId).value = "发送验证码";
		return false;
	}else{
		phoneSec --;
		$id(btnId).value = ""+ phoneSec +"秒后重试";
	}
}

// 开启发送短信验证码表单
function SendPhoneCode(btnId,phoneId,type,userId){
	var phoneStr = $id(phoneId).value;
	if (phoneStr==""){
		alert("请先输入手机");
		try{ $id(phoneId).focus(); }catch (e){}
		return false;
	}
	if (! IsPhone(phoneStr)){
		alert("手机号格式错误，长度11位！");
		try{ $id(phoneId).focus(); }catch (e){}
		return false;
	}

	var userStr = '';
	if (userId.length > 0 && $id(userId)){
		userStr = $id(userId).value;
	}

	$id(btnId).value = "处理中...";
	$.ajaxSetup({cache:false});
	$.get(PcWapParDir() +'p.php?m=sendPhoneForm&type='+ type +'&btnId='+ btnId +'&phone='+ phoneStr +'&username='+ userStr, function(result){
		ShowMengceng(result, 0);
	});
}

// 发送短信验证码表单检测
function SendPhoneForm(){
	try {
		if (SYS_verCodeMode == 20){
			if ($("#geePopDiv input[name='geetest_challenge']").val() == "") {
				alert('请点击验证码按钮进行验证');return false;
			}
		}else{
			if ($id("verCodePop").value==""){alert("验证码不能为空.");$id("verCodePop").focus();return false;}
		}
	}catch (e){}

	AjaxPostDeal('phoneForm');
	return false;
}


// ***** 网站功能 START *****

// 上传图片框
function OT_OpenUpImg(fileMode,fileFormName,fileDir,otherPara){
	/*
	if (isMobile == 1){
		// ShowMengceng("<iframe src='"+ jsPathPart +"upImg.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&upFileType=images&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='360' height='200' style='width:360px;height:200px;'></iframe>");
		ShowMengceng("<iframe src='../usersNewsUpImg.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&upFileType=images&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='360' height='200' style='width:360px;height:200px;'></iframe>");
	}else{
		// var arr = window.open(jsPathPart +"upImg.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=0&upFileType=images&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
		var arr = window.open("../../usersNewsUpImg.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=0&upFileType=images&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
	}
	*/
	ShowMengceng("<iframe src='upImg.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&upFileType=images&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='360' height='200' style='width:360px;height:250px;'></iframe>");
}

// 上传文件框
function OT_OpenUpFile(fileMode,fileFormName,fileDir,otherPara){
	/*
	if (isMobile == 1){
		// ShowMengceng("<iframe src='"+ jsPathPart +"upFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='320' height='140' style='width:320px;height:140px;'></iframe>");
		ShowMengceng("<iframe src='../usersNewsUpFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='320' height='140' style='width:320px;height:140px;'></iframe>");
	}else{
		// var arr = window.open(jsPathPart +"upFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=0&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
		var arr = window.open("../../usersNewsUpFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=0&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
	}
	*/
	ShowMengceng("<iframe src='upFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='320' height='140' style='width:320px;height:250px;'></iframe>");
}

// 上传大文件框
function OT_OpenUpBigFile(fileMode,fileFormName,fileDir,otherPara){
	/*
	if (isMobile == 1){
		// ShowMengceng("<iframe src='"+ jsPathPart +"upBigFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='320' height='140' style='width:320px;height:140px;'></iframe>");
		ShowMengceng("<iframe src='../usersNewsUpBigFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='320' height='140' style='width:320px;height:140px;'></iframe>");
	}else{
		// var arr = window.open(jsPathPart +"upBigFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=0&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
		var arr = window.open("../../usersNewsUpBigFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=0&1=1"+ otherPara,"","top=150,left="+ ((window.screen.width-600)/2) +",width=600,height=300,menubar=no,scrollbars=yes,status=no,resizable=yes");
	}
	*/
	ShowMengceng("<iframe src='upBigFile.php?fileMode="+ fileMode +"&fileFormName="+ fileFormName +"&upPath="+ fileDir +"&isWap=1&1=1"+ otherPara +"' frameborder='0' scrolling='no' allowtransparency='yes' width='320' height='140' style='width:320px;height:250px;'></iframe>");
}

// 表单图片数量
function CheckFormImg(str){
	var num = $id(str +'_num').value;
	for (i=1; i<=9; i++){
		if (i <= num){
			$id(str +'_'+ i +'box').style.display = '';
		}else{
			$id(str +'_'+ i +'box').style.display = 'none';
		}
	}
}


// 密码加密
function EncPwdData(pwdName){
	if ($id(pwdName).value == $id('pwdEnc').value){ return false; }
	$.ajaxSetup({cache:false, async:false});
	$.get(webPathPart +"read.php?mudi=encPwd&str="+ base64encode($id(pwdName).value) +"&exp=35", function(result){
		var strArr = (result +'||||').split("|");
		if (strArr[3].length > 3){
			$id('pwdMode').value = strArr[1];
			$id('pwdKey').value = strArr[2];
			$id('pwdEnc').value = strArr[3];
			$id(pwdName).value = strArr[3];
			try{
				$id(pwdName +'2').value = strArr[3];
			}catch (e){ }
		}
	});
}


// 签到
function QiandaoDeal(){
	AjaxGetDeal(webPathPart +'plugin_deal.php?m=qiandao&mode=ajax');
}

// 会员退出
function UserExit(){
	if (confirm('您确定要退出？')==true){
		document.location.href = webPathPart +'users_deal.php?mudi=exit&backURL='+ encodeURIComponent(document.location.href);
	}
}


// 点击弹出浮层
var djt;
function ShowMengceng(str, sec){
	if (sec > 0){
		var djSec = 0;
		// djt = window.setInterval("djSecFunc()",1000);
		djt = window.setInterval(function(){
			djSec += 1;
			$("#floatSec").html('&ensp;'+ djSec +'s');
			if (djSec > sec){
				window.clearInterval(djt);
				HiddenMengceng();
			}
		},1000);
		var closeStr = "<span id='floatSec'></span>";
	}else{
		var closeStr = "<div style='margin:0 auto;text-align:center;padding:5px;color:blue;cursor:pointer;' onclick='HiddenMengceng()'>×关闭该窗口</div>";
	}
	// 清除之前的样式
	$("#fullScreen,#floatLayer").remove();
	$("body").append(
		// 占据整个屏幕Div
		"<div id='fullScreen'></div>"+
		// 浮层区
		"<div id='floatLayer'>"+ str + closeStr +"</div>"
	);
}

// 隐藏浮层
function HiddenMengceng(){
	window.clearInterval(djt);
	$("#fullScreen,#floatLayer").remove();
}


// 改变验证码
function ChangeCode(type){
	if (type == 'pop'){ ccId='verCodePop'; }else{ ccId='verCode';type=''; }
	try {
		$id("show"+ type +"code").src=PcWapParDir() +"inc/VerCode/VerCode"+ SYS_verCodeMode +".php?mudi="+ Math.random();
		$id(ccId).value = "";
		$id(ccId).focus();
	}catch (e) {}
}

// 点击验证码框获取验证码
function GetVerCode(str,type){
	if (type == 'pop'){ ccId='showVerCodePop'; }else{ ccId='showVerCode';type=''; }
	try {
		if ($id(ccId).innerHTML.lastIndexOf('VerCode')==-1){
			$id(ccId).innerHTML = "<img id='show"+ type +"code' src='"+ PcWapParDir() +"inc/VerCode/VerCode"+ SYS_verCodeMode +".php?mudi="+ Math.random() +"' align='top' style='cursor:pointer;' onclick='ChangeCode(\""+ type +"\")' alt='点击更换' />";	
		}else if (str == "change"){
			ChangeCode(type);
		}
	}catch (e) {}
}

// 重置验证码
function ResetVerCode(type){
	if (SYS_verCodeMode == 20){
		ResetGeetest(type);
	}else{
		GetVerCode("change",type);
	}
}


// 重置极验
function ResetGeetest(str){
	if (str == 'pop'){
		$id('geePopDiv').innerHTML = "";
		LoadJsFile('geePopJs',webPathPart +'tools/geetest/gtPop.js?v=1.0',1);
	}else{
		$id('geetestDiv').innerHTML = "";
		LoadJsFile('geetestJs',webPathPart +'tools/geetest/gt.js?v=1.0',1);
	}
}



// 加载城市数据
function LoadCityData(idName,prov){
	AjaxGetDeal('read.php?mudi=getCityData&idName='+ idName +'&prov='+ prov);
}


// 调用微信JSSDK
function WxJsSdk(link, theme, img, desc){
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger'){	// 判断是否是微信环境
		// 微信环境
		/*
		wx.miniProgram.getEnv(function(res) {
			if (res.miniprogram) {
				// 小程序环境下逻辑 
			}else {
				// 非小程序环境下逻辑
			}
		})
		*/
		link = location.href;
		$.ajax({
			type : "get",
			url : webPathPart +"p.php?m=getWxJsSdk&url="+ encodeURIComponent(link),
			dataType : "jsonp",
			jsonp: "callback",
			jsonpCallback:"success_jsonpCallback",
			success : function(data){
				try {
					console.log("【微信缩略图】link："+ link);
					console.log("【微信缩略图】img："+ img);
					console.log("【微信缩略图】"+ data['debug'] +"|"+ data['appId'] +"|"+ data['timestamp'] +"|"+ data['nonceStr'] +"|"+ data['signature'] +"|"+ data['url']);
				}catch(e){}
				wx.config({
					debug: data.debug,	// 开启调试模式 true/false
					appId: data.appId,  
					timestamp: data.timestamp,  
					nonceStr: data.nonceStr,  
					signature: data.signature,  
					jsApiList: ["updateAppMessageShareData","updateTimelineShareData"]
				});
			},  
			error:function(data){  
				try {
					console.log("【微信缩略图】连接失败！");
					for (let key in data) {
						console.log("【微信缩略图】"+ key +"："+ data[key]);
					}
				}catch(e){}
			}  
		});  

		wx.ready(function () {
			// 在这里调用 API

			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
			wx.ready(function () {	// 需在用户可能点击分享按钮前就先调用
				wx.updateAppMessageShareData({ 
					title: theme,	// 分享标题
					desc: desc,		// 分享描述
					link: link,		// 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
					imgUrl: img,	// 分享图标
					success: function () {
						// 设置成功
					}
				})
			}); 

			// 自定义“分享到朋友圈”及“分享到 QQ 空间”按钮的分享内容（1.4.0）
			wx.ready(function () {	// 需在用户可能点击分享按钮前就先调用
				wx.updateTimelineShareData({ 
					title: theme,	// 分享标题
					link: link,		// 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
					imgUrl: img,	// 分享图标
					success: function () {
						// 设置成功
					}
				})
			}); 

		});
 
	}else{
		// 非微信环境逻辑
		console.log("【微信缩略图】非微信环境不加载！");
	}
	
}

// 访客统计
if (typeof(judAppRobot)=="undefined"){
	try { console.log("[judAppRobot]未定义"); }catch(e){}
	judAppRobot = false;
}
if (judAppRobot){
	var myDate2 = new Date();
	var timestamp2 = Date.parse(myDate2);
	try { console.log("【访客统计】运行中"); }catch(e){}
	AjaxGetDeal(webPathPart +"p.php?m=robot&rnd="+ timestamp2);
}else{
	try { console.log("【访客统计】未开启"); }catch(e){}
}

// ***** 网站功能 END *****