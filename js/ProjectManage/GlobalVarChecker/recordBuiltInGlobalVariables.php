<?php


	if( isset($_POST['bigv']) )
	{
		file_put_contents('BuiltInGlobalVariables.json', $_POST['bigv']);
	}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>记录内置的全局变量</title>
</head>
<body>
<h1>将浏览器内置的全局对象属性记录到BuiltInGlobalVariables.json中</h1>
</body>
<script>
"use strict";

{
	
	let aAllPropKeys = Reflect.ownKeys( window ); // window自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。 
	
	let xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function()
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				alert("记录window属性成功");
			}
			else{
				alert("记录window属性失败");
			}
		}
	}, false);
	xhr.open("post", "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( "bigv=" + JSON.stringify(aAllPropKeys) );

}
	
</script>
</html>
