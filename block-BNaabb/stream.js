const http = require("http");

const myServer = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        res.write(store);
        res.end();
    });
}

myServer.listen(3456);