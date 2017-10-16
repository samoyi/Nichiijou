

// Split a string into an array using RegExp
function strToArr(str, aRule){
    if( hasAdjacentSameValues(aRule, null) ){
        throw new TypeError('Two `null`s can not be adjacent in `aRule` array');
    }
    str = str.trim();

    let arr = [],
        match = [];
    aRule.forEach((val, index)=>{
        if(val !== null){
            match = str.match(val);
            if( index>0 && arr[index-1]===undefined ){ // previous match is by null
                arr[index-1] = str.slice(0, match.index).trim(); // fill the empty item generated previous
            }
            arr.push(match[0]);
            str = str.slice(match.index+match[0].length); // remove the matched substring
        }
        else{
            if(index !== aRule.length-1){ // is not last item
                // generate a empty item which will be filled by next match
                arr.length++;
            }
            else{ // last item, push the remainder string
                arr.push( str.trim() );
            }
        }
    });
    return arr;
}


function hasAdjacentSameValues(arr, val){
    return arr.some((value, index)=>{
        return Object.is(value, val) && Object.is(value, arr[index+1]);
    });
}

module.exports = strToArr;
