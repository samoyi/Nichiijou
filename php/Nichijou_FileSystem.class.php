<?php 

class Nichijou_FileSystem
{
    // 整体复制并移动
    /*
     * 将src目录下的文件及文件夹复制到dest目录下
     * $aIgnore数组中每一项为不复制的文件名或文件夹名
     * 不能出现中文
     */ 
    public function copyRecurse($src, $dest, $aIgnore=array()) 
    { 
        $dir = opendir($src); 
        @mkdir($dest); 
        while(false !== ( $file = readdir($dir)) ) 
        { 
            if( ( $file != '.' ) && ( $file != '..' ) && !in_array($file, $aIgnore) ) 
            { 
                if ( is_dir($src . '/' . $file) ) 
                { 
                    $this->copyRecurse( $src . '/' . $file, $dest . '/' . $file ); 
                } 
                else 
                { 
                    copy( $src . '/' . $file, $dest . '/' . $file ); 
                } 
            } 
        } 
        closedir( $dir ); 
    }   

		
	// 将文件按照从0开始的整数序号重命名	
	/*
	 * @ para $src      对该路径下的文件进行重命名
	 * @ para $aIgnore  该数组中的文件将被忽略，不进行重命名
	 * @ return         原来名字组成的数组，数组index是现在的名字
	 */
	public function indexFiles($src, $aIgnore=array())
	{
		$dir = opendir($src); 
		
		$oldName = array();
		$index = 0;
		
        while(false !== ( $file = readdir($dir)) ) 
        { 	
            if( ( $file != '.' ) && ( $file != '..' ) && is_file($src.'/'.$file) && !in_array($file, $aIgnore) ) 
            { 
				$extension = pathinfo($file, PATHINFO_EXTENSION);
				$oldName[] = $file;
                rename($src.'/'.$file, $src.'/'.$index++.'.'.$extension);
            } 
        } 
        closedir( $dir ); 
		return $oldName;
	}
	
	// 批量获得文件的文件名 参数同indexFiles方法
	public function getFilesName($src, $aIgnore=array()){
		
		$dir = opendir($src); 
		
		$names = array();
		while(false !== ( $file = readdir($dir)) ) 
        { 	
            if( ( $file != '.' ) && ( $file != '..' ) && is_file($src.'/'.$file) && !in_array($file, $aIgnore) ) 
            { 
				$oldName[] = pathinfo($file, PATHINFO_FILENAME );
            } 
        } 
		return $oldName;
	}
}


?>