const fs = require('fs');
const http = require('http');
const url = require('url');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);



// 缓存的数据
// 服务开启后，从 JSON 读取实际文件进行缓存。除了删除操作以外，不再需要操作 JSON 文件
let cacheData = null;

// 刷新缓存数据
async function refreshData(){
    const data = await readFile('./data.json');
    cacheData = JSON.parse(data);
    console.log('refresh');
}


refreshData().then(()=>{
    http.createServer(async (req, res)=>{
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
        res.setHeader('Access-Control-Allow-Methods', 'DELETE');

        const oURL = url.parse(req.url, true);
        const {pageSize, pageNum, id} = oURL.query;
        const sID = Number.parseInt(id);

        if (req.method === 'GET' && oURL.pathname === '/data'){
            if (pageNum==='1'){ // 初次进入页面则刷新缓存
                try{
                    await refreshData();
                }
                catch(err){
                    res.writeHead(503, 'Service Unavailable');
                    res.end(JSON.stringify({err: 1, msg: 'Service Unavailable'}));
                }
            }

            const data = cacheData.slice((pageNum-1)*pageSize, pageNum*pageSize);
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.writeHead(200, 'Ok');
            res.end(JSON.stringify({err: 0, total: cacheData.length, msg: '', data}));
        }
        else if (req.method === 'DELETE' && oURL.pathname === '/data') {
            res.setHeader('Content-Type', 'application/json;charset=utf-8');

            const index = cacheData.findIndex(item=>{
                return item.id === sID;
            });

            if (index === -1){
                res.writeHead(400, 'Bad Request');
                res.end(JSON.stringify({err: 2, msg: '没有找到对应的ID'}));
            }
            else {
                const copy = cacheData.slice();
                cacheData.splice(index, 1);

                try {
                    await writeFile('./data.json', JSON.stringify(cacheData, null, 4));
                }
                catch(err) {
                    cacheData = copy;
                    res.writeHead(503, 'Service Unavailable');
                    res.end(JSON.stringify({err: 3, msg: 'Service Unavailable'}));
                }

                res.writeHead(200, 'Ok');
                res.end(JSON.stringify({err: 0, total: cacheData.length, msg: 'ok'}));
            }
        }
        else {
            res.end();
        }
    }).listen(1234);
});
