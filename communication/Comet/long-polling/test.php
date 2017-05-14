<?php
	
	// 默认的 max_execution_time 是30秒。这里可以进行修改
	// 设置为0可以永不超时，但实际中应该设定一个超时时间
	set_time_limit(60); 
	
	$pollingTimes = 55; // 在脚本超时之前结束轮询
	while ($pollingTimes--) 
	{
		$jsonData = file_get_contents('test.json');
		// 当json文件中的内容变成33，则跳出轮询，回应请求
		if( $jsonData==='33' ) 
		{
			echo 33;
			break;
		}
		/*
		 * 由于sleep()和usleep()会让脚本保持不结束，
		 * 因而可能会产生长时间占用线程。一些虚拟
		 * 服务器提供商会禁用这两个函数
		 */
		sleep(1);
	}
	echo 'still 22';
?>
 