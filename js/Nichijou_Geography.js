




function degreeToRadian(nDegree) 
{
    return nDegree * Math.PI / 180;
}

  
// 根据两点坐标计算直线距离
/*
 *  地球直径使用固定值6371公里
 *  北纬正号，南纬符号；东经正号，西经符号。
 */
function calcCrow(nLatitude1, nLongitude1, nLatitude2, nLongitude2) 
{
    var EARTH_RADIUS = 6371;
    var dLat = degreeToRadian(nLatitude2-nLatitude1);
    var dLon = degreeToRadian(nLongitude2-nLongitude1);
    var nLatitude1 = degreeToRadian(nLatitude1);
    var nLatitude2 = degreeToRadian(nLatitude2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(nLatitude1) * Math.cos(nLatitude2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = EARTH_RADIUS * c;
    return d;
}
