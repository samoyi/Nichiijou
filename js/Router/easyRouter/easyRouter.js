"use strict";

/*
 * 原理：
 *   1. 给每一个锚点href绑定一个处理函数
 *   2. 监听hash变化，如果变化为某个锚点的href，则执行其对应的处理函数
 */ 

/*
 * 第一个参数是所有的a标签节点组成的数组
 * 第二个参数是是点击某个a标签要执行的函数所组成的数组
 */
 



function addEasyRouter(anchors, callbacks)
{
	var aHash = [];
	Array.prototype.forEach.call(anchors, function(item)
	{
		var sHref = item.href;
		aHash.push( sHref.slice(sHref.lastIndexOf("#") ));
	});

	// 刷新时的处理
	window.addEventListener('load', function ()
	{
		var nAnchorIndex = aHash.indexOf(location.hash);
		if ( nAnchorIndex !== -1  ){
			callbacks[nAnchorIndex]();
		}
	}, false); 
	
	// hash变化时的处理
	window.addEventListener('hashchange', function ()
	{	
		var sCurrentHash = location.hash,
			nAnchorIndex = aHash.indexOf(sCurrentHash);
			console.log( sCurrentHash );
			//console.log( nAnchorIndex );
		if ( nAnchorIndex !== -1  ){
			
			if( "#" === sCurrentHash ){
				location.hash = "";
				alert();
			}
			callbacks[nAnchorIndex]();
		}
	}, false);	
	
}
