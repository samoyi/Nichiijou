
<?php

	$file_base64 = $_POST['file_base64'];
	$file_base64 = base64_decode($file_base64);
	file_put_contents('./hehe.jpg', $file_base64);

?>