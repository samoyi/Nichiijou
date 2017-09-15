<?php

    require_once 'fns.php';

    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password_confirmation = $_POST['password_confirmation'];

    session_set_cookie_params(3600, '', '', isSecure(), true);
    session_start();

    try{
        if( !filled_out($_POST) ){
            throw new Exception('You have not filled the form out correctly. Please go back and try again.');
        }
        if( !valid_email($email) ){
            throw new Exception('That is not a valid email address. Please go back and try again.');
        }
        if( $password !== $password_confirmation ){
            throw new Exception('The passwords you entered do not match. Please go back and try again.');
        }

        register($username, $email, $password);

        $_SESSION['valid_user'] = $username;

        header('location: member.php');
    }
    catch( Exception $err ){
        echo $err->getMessage();
        exit;
    }




?>
