<?php







    header('Access-Control-Allow-Origin: http://localhost');
    header('Access-Control-Allow-Headers: Content-Type');



    // echo "hello, " . $_POST['name'] . ", you're " . $_POST['age'] . " years old.";
    $input = file_get_contents('php://input');
    file_put_contents('err.json', json_encode($input));

?>
