<?php
	
	header("Content-Type: text/event-stream"); 
	

		echo 'data: normal data' ;
		echo "\n\n";
		echo ';data: comment data'; // 并不会向客户端发送该数据
		echo "\n\n";

	/* while (1) 
	{
		echo "event: ping\n";
		$curDate = date(DATE_ISO8601);
		echo 'data: {"time": "' . $curDate . '"}';
		echo "\n\n";

		echo 'data: normal data ' . "\n\n";
		echo 'data: custom data ' . "\n\n";
	  
		ob_end_flush();
		flush();
		sleep(3);
	} */
	



?>
 