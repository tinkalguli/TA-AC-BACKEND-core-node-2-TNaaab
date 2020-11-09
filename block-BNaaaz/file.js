const http = require("http");
const { createReadStream } = require("fs");

let myServer = http.createServer(handleRequest);

function handleRequest(rq, res) {
    createReadStream("./readme.txt").pipe(res);
}

myServer.listen(1000);