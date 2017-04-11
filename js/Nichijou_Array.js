"use strict";


// 从 aArray 数组中删除出现在 aItem 中的每一项
function removeArrayItem(aArray, aItem)
{
    if( !Array.isArray(aArray) || !Array.isArray(aItem) ){
        throw TypeError( "Argument type of removeArrayItem must be Array" );
    }

    let aItemNum = aItem.length,
        nThisTelIndex = -1;

    for(let i=0; i<aItemNum; i++)
    {
        nThisTelIndex = aArray.indexOf(aItem[i]);
        while( nThisTelIndex>-1  )
        {
            aArray.splice(nThisTelIndex, 1);
            nThisTelIndex = aArray.indexOf(aItem[i]);
        }
    }
    return aArray;
}
