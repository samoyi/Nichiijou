

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
