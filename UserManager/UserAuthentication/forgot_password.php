<?php

    require_once 'fns.php';

    $email = $_POST['email'];

    if(valid_email($email)){
        if( $info = get_username_and_password($email) ){
            $token = hash('sha256', $info['username'] . $info['password']);
            // 这个$token要在数据库该用户的行内保存一份。用户最终修改密码的是偶，
            // 要根据用户名找到要修改的用户行，只有找到的用户行包含$token才能修改
            // 如果不加这个，则用户在修改时，可以更改成其他用户的用户名，从而修改了
            // 其他用户的密码
            add_reset_token($email, $token);

            $token_str = $info['username'] ."+". $token;
            $reset_url = 'http://localhost/gits/Nichijou/UserManager/UserAuthentication/reset_password.php?token_str=' . base64_encode($token_str);
            $message = '请在一分钟内访问以下链接完成重设密码：' . $reset_url;
             // send_mail 是一个不存在的函数，因为我还没弄明白怎么发邮件
             // 总之，假设用户收到的邮件正文包含 $message 这个字符串。
             // 假设 send_mail 成功，返回了 true
             // 现在有两种情况：他在一分钟内点击链接修改密码，或者一分钟后才点
            // $result = send_mail($message);
            $result = true;
            echo $message; // 因为不能真的收到邮件，所以打印出来这个字符串
            echo '<br /><br />';
            if( $result ){
                add_reset_expire($email);
                exit('假设邮件发送成功。上面是邮件的正文');
            }
            else{
                exit('邮件发送失败');
            }
        }
        else{
            exit('This email was not registered.');
        }
    }
    else{
        exit('That is not a valid email address. Please go back and try again.');
    }

?>
