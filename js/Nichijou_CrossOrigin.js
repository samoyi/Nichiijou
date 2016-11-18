"use strict";

function Nichijou_CrossOrigin()
{
	
	// common properties ---------------------------------------------------------------------------------------
	
	
	
    // common functions ----------------------------------------------------------------------------------------
	
	

    

    // public properties ---------------------------------------------------------------------------------------
    


    
    // public methods ------------------------------------------------------------------------------------------
    if (typeof this.imagePing !== "function")
    {
        // imagePing
        /*
         * The argument is configuration object, contains one required property and two optional properties.
		 * required property: 'sUrlWithArguments' , the value should be the requested url, and arguments if needed. Like 'http://www.xxx.com/index.php?name=33'
         * optional properties: 'fnSuccess' should be a callback function when request success, and 'fnFail' should be a function triggered when request fail
         */
		Nichijou_CrossOrigin.prototype.imagePing = function( oConfig )
		{
			let img = new Image(); 
			
			let sUrlWithArguments = oConfig.sUrlWithArguments,
				fnSuccess = oConfig.fnSuccess,
				fnFail = oConfig.fnFail;

			img.addEventListener('load', fnSuccess, false); 
			img.addEventListener('error', fnFail, false); 
			img.src = sUrlWithArguments;
		}
    }
}







  
