<?php

    require_once 'fns.php';

    $email = $_POST['email'];

    try{
        $password = reset_password($email);
        notify_password($username, $password);
        echo 'Your new password has been emailed to you';
    }
    catch(Exception $err){
        echo 'Your password could not be reset. Please try again later';
    }


// http://www.cnblogs.com/hehongbin/articles/5741243.html
// http://blog.csdn.net/u013179809/article/details/48266389
// http://www.jb51.net/article/91944.htm
// http://www.daimajiayuan.com/sitejs-17795-1.html
// https://www.codexworld.com/login-system-forgot-password-recovery-email-php-mysql/
// http://www.codingcage.com/2015/09/login-registration-email-verification-forgot-password-php.html
?>
