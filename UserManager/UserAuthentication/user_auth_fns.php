<?php

    function register($username, $email, $password){
        $dbr = db_connect();

        $result = $dbr->query("SELECT * FROM user WHERE email='" .$email. "'");
        if( !$result ){
            throw new Exception('Could not execute query');
        }
        if( $result->num_rows > 0 ){
            throw new Exception('That email is taken. Go back and choose another one.');
        }

        $result = $dbr->query("SELECT * FROM user WHERE username='" .$username. "'");
        if( !$result ){
            throw new Exception('Could not execute query');
        }
        if( $result->num_rows > 0 ){
            throw new Exception('That username is taken. Go back and choose another one.');
        }

        $result = $dbr->query("INSERT INTO user VALUES ('" .$username. "', sha1('" .$password. "'), '" .$email. "')");
        if( !$result ){
            throw new Exception('Could not register you in database. Please try again later.');
        }

        return true;
    }


    function login($username, $password){
        $dbr = db_connect();

        $result = $dbr->query("SELECT * FROM user WHERE username='" .$username. "' AND password = sha1('" .$password. "')");

        if( !$result ){
            throw new Exception('Could not log you in');
        }

        if( $result->num_rows >0 ){
            return true;
        }
        throw new Exception('Could not log you in');

    }


    function check_valid_user(){
        if( isset($_SESSION['valid_user']) ){
            return true;
        }
        return false;
    }


    function change_password($username, $old_password, $new_password){
        login($username, $old_password);

        $dbr = db_connect();
        $result = $dbr->query("UPDATE user SET password = sha1('" .$new_password. "') WHERE username = '" .$username. "'");

        if(!$result){
            throw new Exception('Password could not be changed');
        }
        else{
            return true;
        }
    }


    function reset_password($email){
        $result = $dbr->query("SELECT * FROM user WHERE email='" .$email. "'");
        if( !$result ){
            throw new Exception('Could not query email. Please try it later.');
        }
        if( $result->num_rows > 0 ){

        }
        else{
            throw new Exception('That email is not found.');
        }
    }


    function generate_random_string( $length=16 ) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i=0; $i<$length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

?>
