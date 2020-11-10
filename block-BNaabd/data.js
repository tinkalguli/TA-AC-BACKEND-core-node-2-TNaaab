const http = require("http");
const qs = require("querystring");

const myServer = http.createServer(handleRequest);

function handleRequest(req, res) {
    let contentType = req.headers["content-type"];
    let store = "";

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        console.log(store, contentType);
        if (req.method === "POST" && req.url === "/json" && contentType === "application/json") {
            res.end(store);
        }

        if (req.method === "POST" && req.url === "/form" && contentType === "application/x-www-form-urlencoded") {
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    });
}

myServer.listen(7000);