<?php

/*
	需要重命名的函数
*/
class Nichiijou
{

	public function differentItemsInTwoIndexedArrays( $array1, $array2 )
	{
		$aUniqueItemsInArray1 = array();
		$aUniqueItemsInArray2 = array();
		foreach($array1 as $value)
		{
			if( !in_array($value, $array2) )
			{
				$aUniqueItemsInArray1[] = $value;	
			}
			
		}
		foreach($array2 as $value)
		{
			if( !in_array($value, $array1) )
			{
				$aUniqueItemsInArray2[] = $value;	
			}
			
		}

		return array_merge( $aUniqueItemsInArray1, $aUniqueItemsInArray2 );
	}
}
?>