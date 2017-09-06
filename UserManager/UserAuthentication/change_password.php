<?php
    session_start();

    require_once 'fns.php';

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
            if( strlen($new_password)<6 || strlen($new_password)>16 ){
                throw new Exception('New passwords must be between 6 and 16 characters. Please go back and try again.');
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
