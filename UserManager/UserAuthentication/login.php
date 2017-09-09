<?php

    session_set_cookie_params(3600, '', '', false, true);
    session_start();

    require_once 'fns.php';

    $username = $_POST['username'];
    $password = $_POST['password'];




    if( $username && $password ){
        try{
            login( $username, $password );
            $_SESSION['valid_user'] = $username;
        }
        catch(Exception $err){
            echo 'You could not be logged in.';
            exit;
        }
    }


    if( check_valid_user() ){
        header('location: member.php');
    }
    else{
        echo 'You are not logged in.';
    }

?>
