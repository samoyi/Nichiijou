"use strict";

/*
 * 原理：
 *   1. 给每一个锚点href绑定一个处理函数
 *   2. 监听hash变化，如果变化为某个锚点的href，则执行其对应的处理函数
 */ 

/*
 * HTML a标签href属性的写法：
 *   1. 首页链接只写#号
 *   2. 其他页面链接写#号加页面名称
 *  
 *   参考 example.html
 */ 
 
/*
 * aHash参数：
 * 	 1. 所有a标签href属性值组成的数组（不包括重复的）
 *	 2. 数组首项必须是首页的href属性，即 # 
 *   
 * aCallbacks参数：
 *   数组项与aHash参数一一对应，点击aHash中某一项href所在的a标签时，则执行aCallbacks对应项的函数（更新页面内容）
 *
 * 参考 example.html
 */
 
/*
 * XXX
 *   1. hash变化为首页时，location.href会在末尾带上一个无意义的 # 号
 */
 



function addHashRouter(aHash, aCallbacks)
{

	// 新进入或刷新时的处理
	window.addEventListener('load', function ()
	{
		let sCurrentHash = location.hash,
			nAnchorIndex = aHash.indexOf(sCurrentHash);
			
		if( !sCurrentHash) // 首页，hash为空
		{
			aCallbacks[0]();
		}
		else if ( nAnchorIndex !== -1  )
		{
			aCallbacks[nAnchorIndex]();
		}
	}, false); 
	
	// hash变化时的处理
	window.addEventListener('hashchange', function ()
	{	
		let sCurrentHash = location.hash,
			nAnchorIndex = aHash.indexOf(sCurrentHash);
		
		if( !sCurrentHash ) // 首页，hash为空
		{
			aCallbacks[0]();
		}		
		else if ( nAnchorIndex !== -1  )
		{
			aCallbacks[nAnchorIndex]();
		}
	}, false);	
	
}
