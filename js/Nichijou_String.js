"use strict";

function Nichijou_Event(name, age, job)
{

	// common properties ---------------------------------------------------------------------------------------



    // common functions ----------------------------------------------------------------------------------------





    // public properties ---------------------------------------------------------------------------------------




    // public methods ------------------------------------------------------------------------------------------
    if (typeof this.RegExpEscape != "function")
    {

			// 对一个打算用于正则表达式模式的字符串中需要转义的字符进行转义
			Nichijou_Math.prototype.RegExpEscape = function(str)
			{
				let sNeedToBeEscaped = "{[(\\^$|?*+.)]}"; // 所有需要转义的字符
				let aNeedToBeEscaped = [...str].map(function(value)
				{
					if( sNeedToBeEscaped.indexOf(value) > -1 ){
						return "\\" + value;
					}
					return value;
				});
				return aNeedToBeEscaped.join("");
			}
		}
}
