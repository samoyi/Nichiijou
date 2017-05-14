<?php

/*
 * 通过指定的参数来返回不同的JS代码执行
 * 如果没有接收到参数或接收到错误的参数，可以返回JS错误抛出
 */
  
if( isset($_GET['jsonp']) )
{
	switch($_GET['jsonp'])
	{
		case 'name':
		{
			echo 'let JSONP_Name = "33";';
			break;
		}
		case 'age':
		{
			echo 'let JSONP_Age = 22;';
			break;
		}
		case 'info':
		{
			echo $_GET['funcName'] . '({name: "33", age: 22})';
			break;
		}
		default:
		{
			echo 'throw new Error("Wrong JSONP parameter")';
		}
	}
}
else{
	echo 'throw new Error("No JSONP parameter")';
}

?>

