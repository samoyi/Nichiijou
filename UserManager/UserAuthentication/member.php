<?php
    require_once 'fns.php';
    
    session_set_cookie_params(3600, '', '', isSecure(), true);
    session_start();

    if( isset($_SESSION['valid_user']) ){
        echo 'Hello, ' . $_SESSION['valid_user']. ' You are logged in';
        echo '<br />';
        echo '<a href="logout.php">log out</a>';
        echo '<br />';
        echo '<a href="index.html">change password</a>';
    }
    else{
        echo '<a href="index.html">先登录</a>';
    }




?>
