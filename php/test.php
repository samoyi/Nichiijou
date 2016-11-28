<meta charset="utf-8">
<pre><?php

require 'Nichijou_String.class.php';
$NS = new Nichijou_String();

$str1 = "hello world";
$str2 = "helle world";

$result = $NS->firstDiffChar( $str1, $str2 );
print_r($result);







?></pre>