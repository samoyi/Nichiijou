

// 从 aArray 数组中删除出现在 aItem 中的每一项
/*
 *  直接修改原数组
 *  返回值是 aArray 中实际删除了 aItem 中的哪些项
 */
{
    function removeArrayItem(aArray, aItem)
    {

        if( !Array.isArray(aArray) || !Array.isArray(aItem) ){
            throw TypeError( "Argument type of removeArrayItem must be Array" );
        }

        let aRemoved = [];

        let aItemNum = aItem.length,
        nThisTelIndex = -1;

        for(let i=0; i<aItemNum; i++)
        {
            nThisTelIndex = aArray.indexOf(aItem[i]);
            if( nThisTelIndex>-1  )
            {
                aRemoved.push(aItem[i]);
                do{
                    aArray.splice(nThisTelIndex, 1);
                    nThisTelIndex = aArray.indexOf(aItem[i]);
                }
                while( nThisTelIndex>-1  )
            }
        }
        return aRemoved;
    }
}


// 某个值是否出现在一个数组中相邻的位置上
{    
    function hasAdjacentSameValues(arr, val){
        return arr.some((value, index)=>{
            return Object.is(value, val) && Object.is(value, arr[index+1]);
        });
    }
}
