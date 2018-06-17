/*
 * 修改自 http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 * 兼容 history 模式和 hash 模式。完整的 history 模式需要后端配合。
 */

function createRouter(){

	let config = {
		routes: [],
		mode: null,
		root: '/',
	};

	/*
	 * 根据路由路径执行对应的函数
	 * @param  {String}    path    路由路径
	 */
	function route(path){
		path = path || getRoutePath() || '/';
		config.routes.some((route)=>{
			if ((new RegExp(path) + '') === (route.re + '')){
				route.handler.call();
				return true;
			}
		});
	}

	function clearEdgeSlashes(path){
		return path.replace(/\/$/, '').replace(/^\//, '');
	}


	/*
	 * 根据 url 获取路由路径
	 */
	function getRoutePath(){
		let path = '';
		if (config.mode === 'history') {
			path = decodeURI(location.pathname);
			path = config.root !== '/' ? path.replace(config.root, '') : path;
		}
		else {
			let match = location.href.match(/#(.*)$/);
			path = match ? match[1] : '';
		}
		return clearEdgeSlashes(path);
	}


	// 返回单例
	return {

		/*
		 * 配置路由模式和根目录
		 * @param  {object}    options     配置选项
		 */
		config(options){
			config.mode = options
				&& options.mode
				&& options.mode === 'history'
				&& history.pushState
					? 'history'
					: 'hash';
			config.root = options
				&& options.root
					? '/' + clearEdgeSlashes(options.root) + '/'
					: '/';
			return this;
		},

		/*
		 * Add a route
		 * @param  {RegExp}    re          用来匹配路由路径的正则表达式
		 * @param  {Function}  handler	   路由处理函数（切换路径后要执行的操作）
		 */
		add(re, handler){
			config.routes.push({re, handler});
			return this;
		},

		/*
		 * Remove a route
		 * @param  {RegExp}    re     用来匹配路由路径的正则表达式
		 */
		remove(re){
			config.routes.some((route, index)=>{
				if (route.re.toString() === re.toString()){
					return config.routes.splice(index, 1);
				}
			});
			return this;
		},

		/*
		 * Reinitialize
		 */
		flush(){
			config = {
				routes: [],
				mode: null,
				root: '/',
			};
			return this;
		},

		/*
		 * 监听 url 变化，根据变化进行路由
		 */
		listen(){
			// 页面刚加载时，根据路径进行初始路由
			// history 模式需要后端配合
			route(getRoutePath());

			let current = getRoutePath();
			let interval = null;
			clearInterval(interval);
			interval = setInterval(function (){
				// url 发生变化，路由路径和之前的不一样
				if (current !== getRoutePath()){
					current = getRoutePath();
					route(current);
				}
			}, 50);
			return this;
		},

		navigate(path){
			path = path ? path : '';
			if (config.mode === 'history'){
				history.pushState(null, null, config.root + clearEdgeSlashes(path));
			}
			else {
				location.href = location.href.replace(/#(.*)$/, '') + '#' + path;
			}
			return this;
		},
	};
}
