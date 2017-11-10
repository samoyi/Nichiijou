// Transform multi-line string in a file to arrays


const strToArr = require('./index');

const fs = require('fs'),
      util = require('util');

// split rule
/*
 * 1. aRule's length is the number you want to split a string into that parts.
 * 2. Every item in aRule will be a RegExp or null.
 * 3. If a item is a RegExp, split string will be matched use this RegExp;
 * 4. If a item is null, the splitting will be determined by it adjacent matches.
 *   As this reason, if there are 2 `null`s, they are should not be adjacent.
 * 5. RegExp shuold not match a substring has space at beginning or end.
 */
let reCoordinateValue = /(\-|\+)?\d+(\.\d+)?/;
let aRule = [null, reCoordinateValue, reCoordinateValue]; //忽略的项不能影响计算



const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('coordinates.txt')
});

let result = {},
    city = null;
lineReader.on('line', function (line) {
    city = strToArr(line, aRule);
    result[city[0]] = [Number.parseFloat(city[1]), Number.parseFloat(city[2])];
});
lineReader.on('close', function(){
    fs.writeFileSync('coordinates.json', JSON.stringify(result, null, 4));
});
