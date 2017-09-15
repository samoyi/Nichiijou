<?php
    require_once 'fns.php';

    session_set_cookie_params(3600, '', '', isSecure(), true);
    session_start();


    $username = $_POST['username'];
    $password = $_POST['password'];




    if( $username && $password ){
        login( $username, $password );
        $_SESSION['valid_user'] = $username;
    }


    if( check_valid_user() ){
        header('location: member.php');
    }
    else{
        echo 'You are not logged in.';
    }

?>
