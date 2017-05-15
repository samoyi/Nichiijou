<?php
	
	header("Content-Type: text/event-stream\n\n"); 
	
	while (1) 
	{
	  
		echo "event: ping\n";
		$curDate = date(DATE_ISO8601);
		echo 'data: {"time": "' . $curDate . '"}';
		echo "\n\n";

		echo 'data: normal data ' . "\n\n";
		
		ob_flush();
		flush();
	  
		sleep(3);
	}
	
?>
 