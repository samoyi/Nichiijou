;"use strict";
{
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function()
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

				let BuiltInGlobalVariables = JSON.parse( xhr.responseText.trim() );

				let aAllGlobalVariables = Reflect.ownKeys( window ); // 包括window属性和全局变量

				let aCustomGlobalVariables = aAllGlobalVariables.filter(function(item)
				{
					return BuiltInGlobalVariables.indexOf(item) < 0;
				});
				console.log( "全局作用域下声明的函数以及用var声明的全局变量：", aCustomGlobalVariables );
			}
			else{
				alert("读取window属性失败");
			}
		}
	}, false);
	xhr.open("get", "GlobalVarChecker/BuiltInGlobalVariables.json?"+Math.random(), true);
	xhr.send(null);
}
