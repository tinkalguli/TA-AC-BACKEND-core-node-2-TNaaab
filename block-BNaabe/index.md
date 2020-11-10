## BLOCK-writeCode

#### Path
Q. Suppose we have 3 files inside a directory on desktop
The structure is
  - node(folder)
    - app.js
    - server.js
    - index.html
You are currently inside server.js

Write code to 
- capture absolute path of `server.js`(itself)
- get absolute path of `app.js`
- get realtive path of `index.html`
- get absolute path of `index.html` using `path module` 

```js
const path = require("path");

console.log(__filename); // absolute path of `server.js`
console.log(path.join(__dirname + "/app.js")); // absolute path of `app.js`
console.log("./index.html"); // realtive path of `index.html`
console.log(path.join(__dirname + "/index.html")); // absolute path of `index.html`
```

#### Capture data on server

Q. Create a server using http
- handle post method on '/' route
- send json data on it from postman

```js
// data format is
{
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul'
}
```
- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.

```js
const http = require("http");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let contentType = req.headers["content-type"];
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (req.method === "POST" && req.url === "/" && contentType === "application/json") {
          res.statusCode = 200;
          res.end(store);
        }
    });
}

server.listen(1000);
```

Q. Follow above steps with form data from postman instead of json data.
- once data has been captured, send only captain's name in response.

```js
const http = require("http");
const qs = require("querystring");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let contentType = req.headers["content-type"];
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (req.method === "POST" && req.url === "/" && contentType === "application/x-www-form-urlencoded") {
            res.statusCode = 200;
            let captainName = qs.parse(store).captain;
            res.end(captainName);
        }
    })
}

server.listen(1000);
```

Q. Create server which can handle both json/form data without specifying which format of data is being received.
- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form 
- send entire data in response
- data sent from postman should have fields:
  - city
  - state
  - country
  - pin

```js
const http = require("http");
const qs = require("querystring");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let contentType = req.headers["content-type"];
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (contentType === "application/json") {
            res.end(store);
        }

        if (contentType === "application/x-www-form-urlencoded") {
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(9000);
```

Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>

```js
const http = require("http");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let contentType = req.headers["content-type"];
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (contentType === "application/json") {
            let name = JSON.parse(store).name;
            let email = JSON.parse(store).email;
            res.writeHead(200, {"content-type" : "text/html"})
            res.write(`<h1>Name : ${name}</h1><h2>Email : ${email}</h2>`);
            res.end();
        }
    })
}

server.listen(9000);
```

Q. Follow above question with form data containing fields i.e name and email. 
- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.

```js
const http = require("http");
const qs = require("querystring");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let contentType = req.headers["content-type"];
    let store = '';

    req.on("data", (chunk) => {
        store += chunk;
    });

    req.on("end", () => {
        if (contentType === "application/x-www-form-urlencoded") {
            let email = qs.parse(store).email;
            res.writeHead(200, {"content-type" : "text/html"})
            res.write(`<h2>Email : ${email}</h2>`);
            res.end();
        }
    })
}

server.listen(9000);
```

#### Note:- 
Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.