"use strict";

self.onmessage = function(event)
{
    // 接收到数据
    let num = event.data;

    // 引入外部文件
    self.importScripts("Fibonacci.js");

    // 处理数据
    let nResult = Fibonacci( num );

    // 将处理后的数据发会页面
    self.postMessage( nResult );

    // 结束
    self.close(); // 也可以在main.html中调用 worker.terminate();
};
