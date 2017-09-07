<?php

    require_once 'fns.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
    $password_confirmation = $_POST['password_confirmation'];


    if( $password !== $password_confirmation ){
        exit('Passwords entered were not the same.');
    }
    reset_password($username, $password);
    echo 'Password changed';

?>
