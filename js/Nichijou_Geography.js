

function Nichijou_Geography()
{
	
	// common properties ---------------------------------------------------------------------------------------
	const EARTH_RADIUS = 6371;
	
	
    // common functions ----------------------------------------------------------------------------------------
	// 角度转弧度
	function degreeToRadian(nDegree) 
    {
        return nDegree * Math.PI / 180;
    }
	
	// 弧度转角度
	function radianToDegree(nRadian) 
    {
        return nRadian * 180 / Math.PI;
    }
	
	// 标准球面两点球面距离
    function sphericalDistance(r, nLongitude1, nLatitude1, nLongitude2, nLatitude2)
    {
		nLatitude1 = degreeToRadian(nLatitude1);
		nLongitude1 = degreeToRadian(nLongitude1);
		nLatitude2 = degreeToRadian(nLatitude2);
		nLongitude2 = degreeToRadian(nLongitude2);
        return r * Math.acos( Math.sin(nLatitude1)*Math.sin(nLatitude2) + Math.cos(nLatitude1)*Math.cos(nLatitude2)*Math.cos(nLongitude1-nLongitude2) );
    }
	
	

    

    // public properties ---------------------------------------------------------------------------------------
    


    
    // public methods ------------------------------------------------------------------------------------------
    if (typeof this.roughDistance != "function")
    {
        // 根据两点坐标计算粗略的地表距离
        /*
         *  地球直径使用固定值6371公里
         *  北纬正号，南纬符号；东经正号，西经符号。
         */
        Nichijou_Geography.prototype.roughDistance = function(nLongitude1, nLatitude1, nLongitude2, nLatitude2) 
        {
			return sphericalDistance(EARTH_RADIUS, nLongitude1, nLatitude1, nLongitude2, nLatitude2);
        }

    }
}







  
