/*
 * 修改自 http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url	
 */

function createRouter()
{
	return {
		routes: [],
		mode: null,
		root: '/',
		config: function (options)
		{
			this.mode = options && options.mode && options.mode === 'history'
			&& !!(history.pushState) ? 'history' : 'hash';
			this.root = options && options.root ? '/' + this.clearEdgeSlashes(options.root) + '/' : '/';
			return this;
		},
		getFragment: function ()
		{
			var fragment = '';
			if (this.mode === 'history')
			{
				/*
				fragment = this.clearEdgeSlashes(decodeURI(location.pathname + location.search));
				fragment = fragment.replace(/\?(.*)$/, '');
				*/
				// modify1 将原作者上面两行替换为下面的一行。不知道有什么区别。
				fragment = this.clearEdgeSlashes(decodeURI(location.pathname));
				fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
			}
			else
			{
				var match = window.location.href.match(/#(.*)$/);
				fragment = match ? match[1] : '';
			}
			return this.clearEdgeSlashes(fragment);
		},
		clearEdgeSlashes: function (path)
		{
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
		},
		add: function (re, handler)
		{
			if (typeof re == 'function')
			{
				handler = re;
				re = '';
			}
			this.routes.push({re: re, handler: handler});
			return this;
		},
		remove: function (param)
		{	
			for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++)
			{
				if (r.handler === param || r.re.toString() === param.toString())
				{
					this.routes.splice(i, 1);
					return this;
				}
			}
			return this;
		},
		flush: function ()
		{
			this.routes = [];
			this.mode = null;
			this.root = '/';
			return this;
		},
		check: function (f)
		{
			var fragment = f || this.getFragment();
			for (var i = 0; i < this.routes.length; i++)
			{
				var match = fragment.match(this.routes[i].re);
				
				if (match)
				{	
					match.shift();
					this.routes[i].handler.apply({}, match);
					return this;
				}
			}
			return this;
		},
		listen: function ()
		{
			var self = this;
			var current = self.getFragment();
			var fn = function ()
			{
				if (current !== self.getFragment())
				{
					current = self.getFragment();
					self.check(current);
				}
			}
			clearInterval(this.interval);
			this.interval = setInterval(fn, 50);
			return this;
		},
		navigate: function (path)
		{
			path = path ? path : '';
			if (this.mode === 'history')
			{
				history.pushState(null, null, this.root + this.clearEdgeSlashes(path));
			}
			else
			{
				window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
			}
			return this;
		}
	};
}



