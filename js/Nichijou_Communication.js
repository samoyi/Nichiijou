"use strict";


// AJAX GET
/*
 * @param sURL               请求URL
 * @param fnSuccessCallback  请求成功之后的回调函数。接受一个参数用来获取xhr.responseText
 * @param fnFailCallback     请求失败之后的回调函数。接受一个参数用来获取xhr.status
 */
function AJAX_GET(sURL, fnSuccessCallback, fnFailCallback)
{
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function()
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				// 必要的时候，使用 getResponseHeader() 检查首部信息
				fnSuccessCallback && fnSuccessCallback( xhr.responseText );
			}
			else{
				fnFailCallback && fnFailCallback( xhr.status );
			}
		}
	}, false);
	xhr.open("get", sURL, true);
	xhr.send(null);
}


// AJAX POST
/*
 * @param sURL               请求URL
 * @param data               request body
 * @param fnSuccessCallback  请求成功之后的回调函数。接受一个参数用来获取xhr.responseText
 * @param fnFailCallback     请求失败之后的回调函数。接受一个参数用来获取xhr.status
 */
function AJAX_POST(sURL, data, fnSuccessCallback, fnFailCallback)
{
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function()
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				// 必要的时候，使用 getResponseHeader() 检查首部信息
				fnSuccessCallback && fnSuccessCallback( xhr.responseText );
			}
			else{
				fnFailCallback && fnFailCallback( xhr.status );
			}
		}
	}, false);
	xhr.open("post", sURL, true);
	// 如果发送FormDate，则不需要设置Content-Type，但截至2017.5，FormDate的浏览器支持并不理想
	xhr.setRequestHeader("Content-Type", "application/x-www-form-sURLencoded");
	xhr.send(data);
}

