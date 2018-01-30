'use strict';

const http = require('http');

http.createServer((req, res)=>{
    // console.log(req.body);
    let body = [];
    req.on('data', (chunk)=>{
        body.push(chunk);
    });
    req.on('end', ()=>{
        console.log(Buffer.concat(body).toString());
    });
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Method', 'DELETE, PUT');

    res.end('hello');
}).listen(8080);
