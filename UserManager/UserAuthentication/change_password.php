<?php
    require_once 'fns.php';
    
    session_set_cookie_params(3600, '', '', isSecure(), true);
    session_start();



    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];
    $password_confirmation = $_POST['password_confirmation'];

    try{
        if( check_valid_user() ){
            if( !filled_out($_POST) ){
                throw new Exception('You have not filled out the form completely');
            }
            if( $new_password !== $password_confirmation ){
                throw new Exception('Passwords entered were not the same.');
            }
            change_password($_SESSION['valid_user'], $old_password, $new_password);
            echo 'Password changed';
        }
        else{
            echo '<a href="index.html">先登录</a>';
        }
    }
    catch(Exception $err){
        echo $err->getMessage();
    }





?>
