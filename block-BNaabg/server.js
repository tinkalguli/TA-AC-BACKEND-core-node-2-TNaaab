const http = require("http");
const fs = require("fs");
const url = require("url");
const userDir = __dirname + "/users/";

const server = http.createServer();

server.on("request", (req, res) => {
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        // Create file
        if (req.method === "POST" && req.url === "/users") {
            let username = JSON.parse(store).username;
            fs.open(userDir + username + ".json", "wx", (err, fileNum) => {
                if (err) res.end(JSON.stringify(err));
                fs.writeFile(fileNum, store, (err) => {
                    if (err) res.end(json.stringify(err));
                    fs.close(fileNum, (err) => {
                        if (err) res.end(json.stringify(err));
                        res.end(`${username} successfully created`);
                    });
                });
            });
        }

        // Read file
        let parsedUrl = url.parse(req.url, true);
        let queryUser = parsedUrl.query.username;

        if (req.method === "GET" && parsedUrl.pathname === "/users") {
            fs.readFile(userDir + queryUser + ".json", (err, content) => {
                if (err) res.end(JSON.stringify(err));
                res.end(content);
            });
        } 

        // Delete file
        if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
            fs.unlink(userDir + queryUser + ".json", (err) => {
                if (err) res.end(JSON.stringify(err));
                res.end(`${queryUser}.json successfully deleted`);
            });
        } 

        // Update file
        if (req.method === "PUT" && parsedUrl.pathname === "/users") {
            fs.open(userDir + queryUser + ".json", "r+", (err, fileNum) => {
                if (err) res.end(JSON.stringify(err));
                fs.ftruncate(fileNum, (err) => {
                    if (err) res.end(JSON.stringify(err));
                    fs.writeFile(fileNum, store, (err) => {
                        if (err) res.end(json.stringify(err));
                        fs.close(fileNum, (err) => {
                            if (err) res.end(json.stringify(err));
                            res.end(`${queryUser} successfully updated`);
                        });
                    });
                });
            });
        }
    });
});

server.listen(3000);