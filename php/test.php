<meta charset="utf-8">
<pre><?php

require 'Nichiijou.class.php';
$Nichiijou = new Nichiijou();

$array1 = [1, 2, 3, 4, 5];
$array2 = [3, 4, 5, 6, 7];
print_r( $Nichiijou->differentItemsInTwoIndexedArrays( $array1, $array2 ) ); 



?></pre>