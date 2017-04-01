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
				$type = explode("/", $file["type"])[1];
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
