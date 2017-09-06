<?php

    function db_connect(){
        $dbr = new mysqli('localhost', 'root', 'root', 'user_authentication');
        if($dbr){
            return $dbr;
        }
        throw new Exception('Could not connect to dabase server');
    }

?>
