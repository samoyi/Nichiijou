
<?php
	
	define('IMAGE_DIR', 'http://127.0.0.1/gits/Nichijou/js/CompressImage/images/');
	
	$file_base64 = $_POST['file_base64'];
	$file_base64 = base64_decode($file_base64);
	$sImageName = rand().'.jpg';
	file_put_contents('images/'.$sImageName, $file_base64); // TODO 这里固定成jpg了
	
	echo IMAGE_DIR . $sImageName;

?>