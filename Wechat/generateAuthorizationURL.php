<?php
	// 文档  https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
	
	
	define('APPID', 'wx2e87611162aae7f4');
	define('REDIRECT_URI', 'http://www.red-space.cn/wxpay/example/jsapi.php');
	define('SCOPE', 'nsapi_base'); // nsapi_base只获取openid，snsapi_userinfo还能获取头像昵称等
	define('STATE', ''); // 可选的传给回调页面的一个参数，参数名为state
	
	if( SCOPE === 'nsapi_base' ){
		echo 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' .APPID. '&redirect_uri=' .urlencode(REDIRECT_URI). '&response_type=code&scope=snsapi_base&state=' .STATE. '#wechat_redirect';
	}
	elseif( SCOPE === 'snsapi_userinfo' ){
		echo 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' .APPID. '&redirect_uri=' .urlencode(REDIRECT_URI). '&response_type=code&scope=snsapi_userinfo&state=' .STATE. '#wechat_redirect';
	}
	

?>