<meta charset="utf-8">
<pre><?php

/* require 'Nichijou_XML.class.php';
$NX = new Nichijou_XML();

$array = array(
	"appid"=> "wxd930ea5d5a258f4f",
	"mch_id"=> 10000100,
	"device_info"=> 1000,
	"body"=> "test",
	"nonce_str"=> "ibuaiVcKdpRxkhJA",
	"sign"=>"9A0A8659F005D6984697E2CA0A9CF3B7"
);
$sRootTag = "xml";

$result = $NX->arrayToXML($array, $sRootTag);
print_r( $result );  */



$test_array = array (
  'bla' => 'blub',
  'foo' => 'bar',
  'stack' => 'overflow'
);
$xml = new SimpleXMLElement('<root/>');
array_walk_recursive($test_array, array ($xml, 'addChild'));
file_put_contents("xml.xml", $xml->asXML());






?></pre>