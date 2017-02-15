"use strict";

// 第一个   

/*
 * 第一个参数是所有的a标签节点组成的数组
 * 第二个参数是是点击某个a标签要执行的函数所组成的数组
 */
function addEasyRouter(anchors, callbacks)
{	
	function Router(){}

	Router.prototype.route = function (path, callback)
	{
		var url = location.hash || '#'; 
		
		// 刷新时的处理
		window.addEventListener('load', function ()
		{
			path = path.slice(path.lastIndexOf("#"));
			if ( url == path ){
				callback && callback();
			}
		}, false); 
		
		// hash变化时的处理
		window.addEventListener('hashchange', function ()
		{	
			url = location.hash || '#';
			path = path.slice(path.lastIndexOf("#"));
			if (url == path){
				callback && callback();
			}
		}, false);
	};
	Router = new Router();
	
	for(let i=0,len=anchors.length; i<len; i++)
	{	
		Router.route(anchors[i].href, callbacks[i]);
	}

}
