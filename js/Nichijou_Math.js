"use strict";

function Nichijou_Math()
{
	
	// common properties ---------------------------------------------------------------------------------------
	
	
	
    // common functions ----------------------------------------------------------------------------------------
	
	

    

    // public properties ---------------------------------------------------------------------------------------
    


    
    // public methods ------------------------------------------------------------------------------------------
    if (typeof this.num2ComputerRadix != "function")
    {
        // 数字转化为计算机进制
		/*
		 * 返回一个最多五项最少一项的数组
		 * 数组项从最右到最左的单位如下 ["GB", "MB", "KB", "Byte", "bit"]
		 */
        Nichijou_Math.prototype.num2ComputerRadix = function (num)
		{
			if( Number.isSafeInteger(num) && num>-1 )
			{
				
				let aValue = [], 
					nBit = num%8,
					nByte = Math.floor( num/8 ),
					nAfterMod = nByte;
				aValue.unshift(nBit);
				
				while( nAfterMod )
				{
					if( aValue.unshift( nAfterMod%1024 ) > 4 )
					{
						break;
					}
					else
					{
						nAfterMod = Math.floor( nAfterMod/1024 );
					}
				}
				return aValue;
			}
			else
			{
				throw new RangeError("The number passed to function num2ComputerUnit should be a non-negative integer and smaller than 'Number.MAX_SAFE_INTEGER', which is " + Number.MAX_SAFE_INTEGER + " in decimal.");
			}
		}

    }
}







  
