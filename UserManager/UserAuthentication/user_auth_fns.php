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

        $result = $dbr->query('INSERT INTO user VALUES ("' .$username. '", "' .hash('sha256', $password). '", "' .$email. '", "", "")');
        if( !$result ){
            throw new Exception('Could not register you in database. Please try again later.');
        }

        $dbr->close();
        return true;
    }

    function login($username, $password){
        $dbr = db_connect();
        $result = $dbr->query('SELECT * FROM user WHERE username="' .$username. '" AND password = "' .hash('sha256', $password). '"');
        $dbr->close();

        if( !$result ){
            exit('Could not log you in');
        }

        if( $result->num_rows === 1 ){
            return true;
        }
        else if ( $result->num_rows === 0 ){
            exit('Check your username or passowrd');
        }

        exit('Could not log you in');
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
        $result = $dbr->query('UPDATE user SET password = "' .hash('sha256', $new_password). '" WHERE username = "' .$username. '"');
        $dbr->close();

        if(!$result){
            throw new Exception('Password could not be changed');
        }
        else{
            return true;
        }
    }


    function get_username_and_password($email){
        $dbr = db_connect();
        $result = $dbr->query("SELECT * FROM user WHERE email='" .$email. "'");
        $dbr->close();

        if( !$result ){
            throw new Exception('Query database failed. Please try again later.');
        }
        if( $result->num_rows === 0 ){
            return false;
        }
        return $result->fetch_array();
    }


    function add_reset_token($email, $token){
        $dbr = db_connect();
        $result = $dbr->query("UPDATE user SET reset_token = '" .$token. "' WHERE email = '" .$email. "'");
        if(!$result){
            exit('提交修改失败');
        }
        $dbr->close();
    }

    function delete_reset_token($username){
        $dbr = db_connect();
        $result = $dbr->query("UPDATE user SET reset_token = '' WHERE username = '" .$username. "'");
        if(!$result){
            exit('提交修改失败');
        }
        $dbr->close();
    }


    function add_reset_expire($email){
        $dbr = db_connect();
        $result = $dbr->query("UPDATE user SET reset_expire = '" .(time()+60). "' WHERE email = '" .$email. "'");
        if(!$result){
            exit('提交修改失败');
        }
        $dbr->close();
    }


    function reset_password($username, $new_password){
        $dbr = db_connect();
        $result = $dbr->query('UPDATE user SET password = "' .hash('sha256', $new_password). '" WHERE username = "' .$username. '"');
        $dbr->close();

        if(!$result){
            exit('Password could not be changed');
        }
        else{
            return true;
        }
    }


?>
