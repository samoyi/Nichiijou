<?php

	/*
	 * 不知道什么原因，如果这里不先把缓冲填满，下面循环中前三次都不能 flush 掉缓冲，导
	 * 致第四次循环的时候直接输出 0123。所以第一次向客户端返回数据的时候，会先返回一个
	 * 长度为 4096 的空格字符串
	 */
	echo str_repeat(" ", 4096);

	$i = 0;
	while ( $i<10 ){
		echo $i++;

		/*
		 * 关于下面两个函数必须同时使用的情况，
		 * 参考 http://php.net/manual/en/function.flush.php
		 */
		ob_flush();
		flush();

		sleep(1);
	}

?>
