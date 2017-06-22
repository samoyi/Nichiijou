"use strict";


// 从 aArray 数组中删除出现在 aItem 中的每一项
/*
 *  直接修改原数组
 *  返回值是 aArray 中实际删除了 aItem 中的哪些项
 */
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


// 分步批量加载图片
/*
 * 按照以下数组形式传参
 * let arr = [
 * 	["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"],
 * 	["5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"],
 * 	["10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg"]
 * ];
 * 在加载完arr第一项的所有图片后，开始加载arr第二项的所有的，以此类推
 * 但如果有某个图片加载失败，则其后的arr数组项将会停止加载
 * 其中通过onerror监听是否加载失败，但因为其兼容性不好，所以其处理函数只提示错误，
 * 不改变实际的图片加载，以保证在所有浏览器上得到统一的加载结果 
 */
function stepBatchLoadImage(arr){
	let loadedCounter = 0,
		index = arguments[1] ? arguments[1] : 0;

	if( arr[index] ){
		loadedCounter = arr[index].length;
		arr[index].forEach(function(item){
			let oNewImage = new Image();
			oNewImage.src = item;
			oNewImage.onload = function(){
				if( loadedCounter-- === 1){
					stepBatchLoadImage(arr, ++index);
				}
			};
            oNewImage.onerror = function(){
                console.error("stepBatchLoadImage 无法加载  " + item + "，其所在组之后的图片组（如果还有）因此无法加载");
            }
		});
	}
}
