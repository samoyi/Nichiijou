<?php
    session_set_cookie_params(3600, '', '', false, true);
    session_start();

    if( isset($_SESSION['valid_user']) ){
        $old_user = $_SESSION['valid_user'];

        unset( $_SESSION['valid_user'] );

        $result_dest = session_destroy();

        if( !empty($old_user) ){
            if( $result_dest ){
                echo 'Logged out. Bye, ' . $old_user;
                echo '<br />';
                echo '<a href="index.html">log in</a>';
            }
            else{
                echo 'Could not log you out';
            }
        }
    }
    else{
        echo 'You were not logged in, and so have not veen logged out.';
        echo '<br />';
        echo '<a href="index.html">log in</a>';
    }


?>
