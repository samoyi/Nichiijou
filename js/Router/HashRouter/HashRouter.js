"use strict";

/*
 * 原理：
 *   1. 给每一个锚点 href 绑定一个处理函数
 *   2. 监听 hash 变化，如果变化为某个锚点的 href，则执行其对应的处理函数
 */

/*
 * HTML a 标签 href 属性的写法：
 *   1. 首页链接只写 #
 *   2. 其他页面链接写 # 加页面名称
 *
 *   参考 example.html
 */

/*
 * aHash参数：
 * 	 1. 所有 a 标签 href 属性值组成的数组（不包括重复的）
 *	 2. 数组首项必须是首页的 href 属性，即 #
 *
 * aCallbacks参数：
 *   数组项与 aHash 参数一一对应，点击 aHash 中某一项 href 所在的 a 标签时，则执行
 *   aCallbacks 对应项的函数（更新页面内容）
 *
 * 参考 example.html
 */


function addHashRouter(aHash, aCallbacks){

    function route(){
        let sCurrentHash = location.hash,
			nAnchorIndex = aHash.indexOf(sCurrentHash);

		if(!sCurrentHash){ // 首页，hash为空
			aCallbacks[0]();
		}
		else if (nAnchorIndex !== -1){
			aCallbacks[nAnchorIndex]();
		}
    }

	// 新进入或刷新时的处理
	window.addEventListener('load', function (){
        route();
	});

	// hash变化时的处理
	window.addEventListener('hashchange', function (){
        route();
	});
}
