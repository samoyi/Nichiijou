<?php

if( sizeof($_FILES) ){
	 // 设定保存路径
	$destDir = 'image/';

	// 服务端验证上传文件
	$aMIMEType = array("image/jpeg", "image/png");
	$nMaxByte = 1024*1024*2;

	$res = array(
		'error'=>''
	);

	foreach( $_FILES as $name=>$file){
		file_put_contents('err.txt', json_encode($file));
		if( !in_array( $file['type'], $aMIMEType ) ){
			$res[$name] = array(
				'err'=> 'file type'
			);
			$res['error'] = $name;
		}
		elseif( $file['size'] > $nMaxByte ){
			$res[$name] = array(
				'err'=> 'file size'
			);
			$res['error'] = $name;
		}
		else
		{
			// PHP 5.4 以降では、関数やメソッドの返す結果を直接配列として扱えるようになりました。 以前は、いったん一次変数に代入しないと配列としては扱えませんでした。
			$temp_arr = explode("/", $file["type"]);
			$type = $temp_arr[1];
			$basename = basename($file["name"]);


			file_exists($destDir) || mkdir($destDir); // 路径不存在则创建

			$move_result = move_uploaded_file($file["tmp_name"], $destDir.$basename);

			if( !$move_result ){
				$res[$name] = array(
					'err'=> 'file move'
				);
				$res['error'] = $name;
			}
		}
	}
	echo json_encode( $res );
}
else{
	echo '{"error": "no file uploaded"}';
}

?>
