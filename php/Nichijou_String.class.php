<?php


class Nichijou_String
{

	public function firstDiffChar( $str1, $str2 )
	{
		$index = strspn($str1 ^ $str2, "\0");
		return array(
			$index, $str1[$index], $str2[$index]
		);
	}
}
?>