"use strict";

// POST时将对象格式的数据格式化字符串
function stringify(data){
	let str = '';
	for(let key in data){
		str += (key + '=' + data[key] + '&');
	}
	return str.slice(0, -1);
}


const XHR = {
	// GET
	/*
	* @param sURL               请求URL
	* @param fnSuccessCallback  请求成功之后的回调函数。接受一个参数用来获取 xhr.responseText
	* @param fnFailCallback     请求失败之后的回调函数。接受一个参数用来获取 xhr.status
	*/
	xhr_get(sURL, fnSuccessCallback, fnFailCallback){
		let xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function(){
			if (xhr.readyState == 4){
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
	},


	// GET Blob
	/*
	* @param sURL               请求URL
	* @param fnSuccessCallback  请求成功之后的回调函数。接受一个参数用来获取 xhr.response
	* @param fnFailCallback     请求失败之后的回调函数。接受一个参数用来获取 xhr.status
	*/
	xhr_getBlob(sURL, fnSuccessCallback, fnFailCallback){
		let xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function(){
			if (xhr.readyState == 4){
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
					fnSuccessCallback && fnSuccessCallback( xhr.response );
				}
				else{
					fnFailCallback && fnFailCallback( xhr.status );
				}
			}
		}, false);
		xhr.responseType = "blob";
		xhr.open("get", sURL, true);
		xhr.send(null);
	},


	// POST
	/**
	* @param sURL               请求URL
	* @param data               request body
	* @param fnSuccessCallback  请求成功之后的回调函数。接受一个参数用来获取xhr.responseText
	* @param fnFailCallback     请求失败之后的回调函数。接受一个参数用来获取xhr.status
	*/
	xhr_post(sURL, data, fnSuccessCallback, fnFailCallback){
		let xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function(){
			if (xhr.readyState == 4){
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
		// 如果发送 FormDate，则不需要设置 Content-Type，但截至2017.5，FormDate 的浏览器支持并不理想
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(stringify(data));
	},
};


const FETCH = {
	// fetch get
	/**
	* @param sURL               请求URL
	* @param sReadType          读取 response 的方法名字符串：
	*								arrayBuffer、blob、formData、json 和 text
	* @param oInit				fetch()方法的第二个参数
	* @return            		使用sReadType指定的方法读取response返回的
	*                           	promise对象。solve之后的res参数为一个对象
	*                               ，如果请求出错res.err为错误码，如果没出错，
	*                               res.result为上述promise读取成功的数据
	*/
	async fetch_get(sURL, sReadType, oInit){
	    try{
	        let response = await fetch(new Request(sURL, oInit));
	        if(!response.ok && response.status!==304){
	            throw new Error(response.status)
	        }

	        let clone = response.clone();

	        switch(sReadType){
	            case 'arrayBuffer':{
	                return await {result: await clone.arrayBuffer()};
	            }
	            case 'blob':{
	                return await {result: await clone.blob()};
	            }
	            case 'formData':{
	                return await {result: await clone.formData()};
	            }
	            case 'json':{
	                return await {result: await clone.json()};
	            }
	            default:{
	                return await {result: await clone.text()};
	            }
	        }
	    }
	    catch(err){
	        return await {
	            err: err.message,
	        };
	    }
	},

	// fetch get
	/**
	* @param sURL               同 fetch_get
	* @param oBody              键值对对象
	* @param sReadType          同 fetch_get
	* @param oInit				同 fetch_get
	* @return            		同 fetch_get
	*/
	function fetch_post(sURL, oBody, sReadType, oInit){
	    let headers = {
	        'Content-Type': 'application/x-www-form-urlencoded',
	    };

	    let oPostInit = {
	        method: 'POST',
	        headers,
	        body: stringify(body)};
	    return fetch_get(sURL, sReadType
	                , Object.assign(oPostInit, oInit||{}));
	}
};


module.exports = {
	XHR,
	FETCH,
};
