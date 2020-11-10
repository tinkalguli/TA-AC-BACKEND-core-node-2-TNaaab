const {createServer} = require("http");
const {createReadStream} = require("fs");
const qs = require("querystring");

const server = createServer(handleRequest);

function handleRequest(req, res) {
    if (req.method === "GET" && req.url === "/form") {
        createReadStream("./form.html").pipe(res);
    }

    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (req.method === "POST") {
            res.writeHead(200, {"content-type" : "text/html"});
            let username = qs.parse(store).username;
            let useremail = qs.parse(store).useremail;
            let age = qs.parse(store).age;
            res.write(`<h2>Name : ${username}</h2><h2>Email : ${useremail}</h2><h2>Age : ${age}</h2>`);
            res.end();
        }
    });
}

server.listen(5678);