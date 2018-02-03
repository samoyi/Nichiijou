'use strict';

// 想要实现的功能是读取文档，然后从里面筛选出指定后缀的url，然后下载
// TODO
/*
    从测试文件test.html中，每次总会有有几个失败的
    读取跨域远程文档时还不成功
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');


// 文档路径
const sURL = 'http://localhost/test/downloadFilesFromHTML/test.html';
// 查找文档中以下类型的url并下载文件
const aSuffix = ['jpg', 'png', 'webp', 'svg'];
// 下载文件保存路径
const sDir = './download/';



// 直接访问localhost:3000即可
http.createServer((req, res)=>{
    if(req.url==='/'){
        getText(sURL, (sText)=>{
            let aURL = matchedURLs(sText, aSuffix);
            batchDownload(aURL, sDir);
        });
    }
    res.end();
}).listen(3000);


// 使用 protocol.get 读取文档文本
function getText(sURL, callback){
    const protocol = sURL.slice(0, 5)==='https' ? https : http;
    protocol.get(sURL, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200 && statusCode !== 304) {
            error = new Error('请求失败。\n' +
            `状态码: ${statusCode}`);
        }
        else if (contentType.indexOf('text/')!==0) {
            error = new Error('无效的 content-type.\n' +
            `期望 text/* 但获取的是 ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // 消耗响应数据以释放内存
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                callback(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
}


// 从文本中查找指定后缀的url
function matchedURLs(sText, aSuffix){
    const re = '(https?:\/\/.*\.(?:' + aSuffix.join('|') + '))';
    const matches = sText.match(new RegExp(re, "gi"));
    return [...new Set(matches)];
}


// 下载一个url
function download(sURL, sDir, callback){
    const protocol = sURL.slice(0, 5)==='https' ? https : http;
    let suffix = sURL.slice(sURL.lastIndexOf('.')+1);
    const re = '\/([^\/\.]+)\.' + suffix + '$';
    let filename = sURL.match(new RegExp(re, "i"))[1];


    let aDownloaded = fs.readdirSync(sDir);
    while(aDownloaded.includes(filename+'.'+suffix)){
        filename += '-'+Math.random();
    }

    let basename = filename+'.'+suffix;
    console.log(sDir+basename);
    let file = fs.createWriteStream(sDir+basename);
    protocol.get(sURL, (response)=> {
        response.pipe(file);
        file.on('finish', ()=> {
            file.close(callback);  // close() is async, call cb after close completes.
        });
    }).on('error', (err)=> { // Handle errors
        fs.unlinkSync(sDir+basename); // Delete the file async. (But we don't check the result)
        if (callback) callback(err.message);
    });
}


// 批量下载url
function batchDownload(aURL, sDir){
    aURL.forEach(url=>{
        download(url, sDir, (errMsg)=>{
            if(errMsg){
                console.error(url + ' 下载失败：' + errMsg);
            }
        });
    });
}
