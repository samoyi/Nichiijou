"use strict";

function Nichijou_History()
{
	
	// common properties ---------------------------------------------------------------------------------------
	
	
	
    // common functions ----------------------------------------------------------------------------------------
	
	

    

    // public properties ---------------------------------------------------------------------------------------
	// 这里需要不需要像定义方法一样先判断一下？判断的原因是什么？
	Object.defineProperties(Nichijou_History.prototype,
	{
		"length": {
			get: function()
			{
				return window.history.length;
			}
		}
	});

    
    // public methods ------------------------------------------------------------------------------------------
    if (typeof this.go != "function")
    {
        // history.go	
        Nichijou_History.prototype.go = function(nStep)
		{
			window.history.go(nStep);
		}
		

    }
}



























  
