<?php 

class Nichijou_FileSystem
{
    // 整体复制并移动
    /*
     * 将src目录下的文件及文件夹复制到dest目录下
     * aIgnore参数中每一项为不复制的文件名或文件夹名
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
}


?>