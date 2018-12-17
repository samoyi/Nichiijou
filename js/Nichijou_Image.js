
// 所有匹配字符的总数
{
	function getMatchedAmount(str, re) {
		let flags = re.flags;
		flags.includes('g') || (re = new RegExp(re, flags+'g'));
		return (str.match(re) || []).length;
	}
}


// 搜索匹配字符的所有位置
{
	function getMatchIndexes(sHaystack, sNeedle){
		if (sNeedle === '') {
			throw new Error('sNeedle should not be ""');
		}

		let indexes = [];
		let start = 0;
		let index = null;
		while (sHaystack.indexOf(sNeedle, start) !== -1) {
			// TODO 这里两次搜索比较不爽
			index = sHaystack.indexOf(sNeedle, start);
			indexes.push(index);
			start = index + 1;
		}
		return indexes;
	}
}
