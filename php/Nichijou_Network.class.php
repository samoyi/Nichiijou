<?php


class Nichijou_Network
{

	// Convert decimal IPv4 address string to binary string
	/*
	 * Example: "192.168.1.100" given, "11000000101010000000000101100100" returned
	 */
	public function IPv4toBinary( $sIPv4 )
	{
		$sBinary = '';
		$sIPv4 = explode('.', $sIPv4);
		foreach( $sIPv4 as $item )
		{
			if( !ctype_digit($item) || $item>255 || $item<0 )
			{
				throw new Exception('The argument of function "IPv4toBinary" has a wrong format' );
			}
			$sBinary .= str_pad( decbin($item), 8, '0', STR_PAD_LEFT );
		}
		return $sBinary;
	}
	
	// Check whether two IPv4 addresses are in same subnet
	/*
	 *  The first two arguments are decimal IPv4 string, the third arguments is decimal subnet mask
	 *  If the two IP Addresses are in same subnet, return true, else return false
	 */
	public function isSanmeSubnet_IPv4($sIP1, $sIP2, $sSubnetMask)
	{
		$sBinaryIP1 = IPv4toBinary( $sIP1 );
		$sBinaryIP2 = IPv4toBinary( $sIP2 );
		$sBinarySubnetMask = IPv4toBinary( $sSubnetMask );
		
		$sDecimalIP1 = bindec( $sBinaryIP1 );
		$sDecimalIP2 = bindec( $sBinaryIP2 );
		$sDecimalSubnetMask = bindec( $sBinarySubnetMask );
		
		$result1 = $sDecimalIP1 & $sDecimalSubnetMask;
		$result2 = $sDecimalIP2 & $sDecimalSubnetMask;
		
		if( $result1 === $result2 )
		{
			return true;
		}
		return false;
	}
}
?>