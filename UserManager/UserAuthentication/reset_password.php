<?php

    if( !isset($_GET['token_str']) || empty($_GET['token_str']) ){
        exit;
    }

    $token_str = base64_decode($_GET['token_str']);
    $username = strtok($token_str, '+');
    $token = strtok('+');

    require_once 'fns.php';

    $dbr = db_connect();
    $result = $dbr->query("SELECT * FROM user WHERE username='" .$username. "'");
    $dbr->close();

    if( !$result ){
        exit('Fail to query database');
    }

    if($user = $result->fetch_array()){
        if(sha1($user['username'] . $user['password']) !== $token){
            exit('token不匹配');
        }
        if( time()>$user['reset_expire'] ){
            delete_reset_token($user['username']);
            exit('链接已过期。重新申请。');
        }

        echo '为用户名为 ' .$user['username']. ' 的账户设置新密码：';
        echo '<br />';
        echo '<form method="post" action="update_password_hash.php">';
        echo '<input type="hidden" name="username" value="' .$user['username']. '" />';
        echo '<input type="password" name="password" require="require" placeholder="输入新密码" />';
        echo '<br />';
        echo '<input type="password" name="password_confirmation" require="require" placeholder="再次输入新密码" />';
        echo '<br />';
        echo '<input class="submit" type="button" value="设置" />';
        echo '</form>';
    }
    else{
        exit('Could not find user ' . $username . ' in database');
    }


?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/sha1.min.js"></script>
<script>
let submit = document.querySelector('.submit');
if(submit){
    submit.addEventListener('click', ()=>{
        let form = submit.parentNode;
        [...form.querySelectorAll('input[type="password"]')].forEach((item)=>{
            item.value = CryptoJS.SHA1(item.value.trim()).toString();
        });
        form.submit();
    });
}
</script>
