<?php

    require_once 'data_valid_fns.php';
    require_once 'db_fns.php';
    require_once 'user_auth_fns.php';

    function isSecure() {
      return
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || $_SERVER['SERVER_PORT'] == 443;
    }

?>
