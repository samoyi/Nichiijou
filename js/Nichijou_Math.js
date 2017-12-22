

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




// 将一组数字映射到一套评分系统中
/*
 *	@param  aScore    Array   一组数字
 *	@param  nMinStar  Number  评分系统的最低分
 *	@param nMaxStar   Number  评分系统的最低分
 *	@param nStepStar  Number  评分系统的分数的最小单位
 */
{
	// let aScore = [86, 24, 35, 39, 30, 71, 80, 87, 97, 39];
	// // 将这组分数映射到五星评分制度上
	// // 最低可以得到3颗星，最高可以得到5颗星，最小步幅为半颗星
	// console.log(mapScoreToStar(aScore, 3, 5, 0.5));
	// Output: [ 4.5, 3, 3.5, 3.5, 3, 4.5, 4.5, 4.5, 5, 3.5 ]

	function mapScoreToStar(aScore, nMinStar, nMaxStar, nStepStar){
	    // 数组排序找到最低最高分
	    let aCopy = aScore.slice(0),
	        aSort = aCopy.sort((m,n)=>m-n);
	        nMin = aSort[0],
	        nMax = aSort[aSort.length-1];

	        // nStep是 nStepStar对应的分数
	    let nStep = (nMax-nMin)/((nMaxStar-nMinStar)/nStepStar),
	        // 0星对应的分数
	        nStar0 = nMin - nStep*(nMinStar/nStepStar);

	    return aScore.map(score=>{
	        return Math.round((score-nStar0)/nStep)/2;
	    });
	}
}



// 数学基础 ————————————————————————————————————————————————————————————————————

// 二元一次方程组求解
{
	/*
	 * ax + by = M
	 * cx + dy = N
	 */
	function foo(a, b, c, d, M, N){
	    if( a/c === b/d ){
	        if( a/c === M/N ){
	            return []; // 无数解
	        }
	        else{
	            return null; // 无解
	        }
	    }
	    let x = (d*M - b*N) / (a*d - b*c);
	    return [x, (M-a*x)/b]; // 唯一解
	}
}

// 一元二次方程求根公式
{
	// ax*x + bx + c = 0
	function getRoot(a, b, c){
	    let delta = b*b - 4*a*c;
	    if( delta >=0 ){
	        let sqrt = Math.sqrt(b*b - 4*a*c);
	        return [(-b + sqrt)/2*a, (-b - sqrt)/2*a];
	    }
	    else{
	        return null;
	    }
	}
}
