const http = require('http');


const server = http.createServer((req, res)=>{
    if (req.url === '/'){
        res.end(
            `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <!-- 向该 frame 发送信息 -->
                <iframe src="http://localhost/test/test.html" id="frame"></iframe>
                <input type="text" id="txt" />
                <input type="button" id="btn" value="发送给frame" />
            </body>
            <script>
            'use strict';

            const oBtn = document.querySelector('#btn');
            const oTxt = document.querySelector('#txt');
            const oFrame = document.querySelector("#frame").contentWindow;

            oBtn.addEventListener('click', function(){
                // 第二个参数指定接受信息的 iframe 所属的 origin
                oFrame.postMessage(oTxt.value, 'http://localhost');
            });


            // 也可以接受 frame 返回的信息
            window.addEventListener('message', receiveMessage, false);
            function receiveMessage(ev){
                if (ev.origin === 'http://localhost'){
                    console.log('Frame 的回复：'+ ev.data);
                }
            }
            </script>
            </html>
        `);
    }
});

server.listen(3000);
