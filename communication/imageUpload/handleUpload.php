<?php

	
	if( isset($_FILES['file']) )
	{
		 // 设定保存路径
		$destDir = 'image/';
		
		// 服务端验证上传文件
		$aMIMEType = array("image/jpeg", "image/png");
		$nMaxByte = 1024*1024*2;
		
		
		
		$file = $_FILES['file'];

		$res = array(
			'err'=>''
		);
		
		if( !$file['error'] )
		{
			if( !in_array( $file['type'], $aMIMEType ) )
			{
				$res['err'] = 'file type';
			}
			elseif( $file['size'] > $nMaxByte )
			{
				$res['err'] = 'file size';
			}
			else
			{
				// PHP 5.4 以降では、関数やメソッドの返す結果を直接配列として扱えるようになりました。 以前は、いったん一次変数に代入しないと配列としては扱えませんでした。
				$temp_arr = explode("/", $file["type"]);
				$type = $temp_arr[1];
				$basename = basename($file["name"]);
				

				file_exists($destDir) || mkdir($destDir); // 路径不存在则创建
				
				$move_result = move_uploaded_file($file["tmp_name"], $destDir.$basename);

				if( !$move_result )
				{
					$res['err'] = 'file move';
				}
			}
		}
		else
		{
			$res['err'] = 'file upload';
		}
		
		echo json_encode( $res );
	}
	
	
	

?>
