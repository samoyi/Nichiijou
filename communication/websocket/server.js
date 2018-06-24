const http = require('http');　
const fs   = require('fs');
const path = require('path');
const mime = require('mime');
const cache = {};  // cache object is where the contents of cached files are stored


const server = http.createServer((request, response)=>{
    let filePath = null;
    if (request.url == '/') {
        filePath = 'public/index.html';
    }
    else {
        filePath = 'public' + request.url;
    }

    let absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});


const chatServer = require('./lib/chat_server');
//  Starts the Socket.IO server functionality, providing it with an already
// defined  HTTP server so it can share the same TCP / IP port
chatServer.listen(server);


server.listen(3000, function() {
    console.log("Server listening on port 3000.");
});


function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {
        "content-type": mime.getType(path.basename(filePath))
    });
    response.end(fileContents);
}

// Accessing memory storage ( RAM ) is faster than accessing the filesystem.
// Because of this, it’s common for Node applications to cache frequently used
// data in memory. Our chat application will cache static files to memory, only
// reading them from disk the first time they’re accessed.
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {  // Check if the file is cached in memory
        sendFile(response, absPath, cache[absPath]);  // Reture file from memory
    }
    else {
        fs.readFile(absPath, (err, data)=>{  // Get file from disk
            if (err) {
                send404(response);
            }
            else {
                cache[absPath] = data; // cache the file
                sendFile(response, absPath, data);  // Return file
            }
        });
    }
}
