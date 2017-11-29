

// 获得字符串长度 兼容3字节和4字节字符
{
    function length(str){
        return [...str].length;
        //return Array.from(str).length; //或者这个
    }
}


// 对一个打算用于正则表达式模式的字符串中需要转义的字符进行转义
{
    function RegExpEscape(str)
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



// random numeric string with specific length
/*
 * Inside this function a number 10^n will generate , if this number is bigger
 * than Number.MAX_SAFE_INTEGER(9007199254740991, 16 digits), I'm not sure but
 * maybe, the calculation will get something wrong.
 * Therefore, if parameter n is larger than 15, this function will use safeStr()
 * to create some substring, and concatenate them.
 *
 *
 */
{
    function randomNumericString(n){
        const nSafeLen = (Number.MAX_SAFE_INTEGER + '').length - 1;
        function safeStr(){
            return (''+Math.floor( Math.random() * Math.pow(10, nSafeLen) )).padStart(nSafeLen, '0');
        }

        let sResult = '';
        while(n>nSafeLen){
            sResult += safeStr();
            n -= nSafeLen;
        }
        return sResult +  (''+Math.floor( Math.random() * Math.pow(10, n) )).padStart(n, '0');
    }
}


// Split a string into an array using RegExp
// See demos/SplitStringIntoArrayUsingRegExp
{
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
}


// Find the indexes of all ascii characters in a string
{
    function findAsciiIndexes(str){
        let aStr = [...str],
        aIndex = [];
        aStr.filter((char,index)=>{
            if(char.codePointAt(0)<127){
                aIndex.push(index);
            }
        });
        return aIndex;
    }
}
