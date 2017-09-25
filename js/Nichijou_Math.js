

// 数字转化为计算机进制
/*
* 返回一个最多五项最少一项的数组
* 数组项从最右到最左的单位如下 ["GB", "MB", "KB", "Byte", "bit"]
*/
{
	function num2ComputerRadix(num)
	{
		if( Number.isSafeInteger(num) && num>-1 )
		{
			let aResult = [],
				nBit = num%8,
				nByte = Math.floor( num/8 ),
				nAfterMod = nByte;
				aResult.unshift(nBit);

			while( nAfterMod )
			{
				if( aResult.unshift( nAfterMod%1024 ) > 4 ){
					break;
				}
				else{
					nAfterMod = Math.floor( nAfterMod/1024 );
				}
			}
			return aResult;
		}
		else
		{
			throw new RangeError("The number passed to function num2ComputerUnit should be a non-negative integer and smaller than 'Number.MAX_SAFE_INTEGER', which is " + Number.MAX_SAFE_INTEGER + " in decimal.");
		}
	}
}



// 在指定闭区间内生成不重复的nNum个整数
{

	function createNonReplicativeInt(nMin, nMax, nNum)
	{
		if( typeof arguments[0] !== "number" || typeof arguments[0] !== "number" || typeof arguments[0] !== "number" )
		{
			throw new TypeError( "Function createNonReplicativeInt has a wrong type argument");
		}
		if( arguments[0]>arguments[1] || arguments[2]>(arguments[1]-arguments[0]+1) )
		{
			throw new RangeError( "One of arguments of Function createNonReplicativeInt is out of range");
		}

		let aResult = [];

		let nCreated = 0;
		while( nCreated < nNum )
		{
			let nRan = Math.floor( Math.random()*(nMax-nMin+1)+nMin );
			if( aResult.indexOf(nRan)<0 )
			{
				aResult.push(nRan);
				nCreated++;
			}
		}

		return aResult;
	}
}
