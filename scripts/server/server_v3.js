const http = require('http');
const queryString = require('querystring');
const url = require("url");
const hostname = '127.0.0.1';
const port = 3000;
const host = `http://${hostname}:${port}/`

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    console.log("[200 OK] " + request.method + " to " + request.url);
    switch (request.method) {
        case "GET":
            let data = url.parse(request.url, true).query;
            writeResponse(request, response, data, data['callback']);
            break
        case "POST":
            let contentType = request.headers["content-type"];
            let fullBody= "";

            if (contentType && contentType.indexOf("application/x-www-form-urlencoded") > -1) {

                request.on("data", function (chunk) {
                    fullBody += chunk.toString();
                })

                request.on("end", function () {
                    let dBody = queryString.parse(fullBody);
                    writeResponse(request, response, dBody, url.parse(request.url, true).query['callback'])
                })

            } else {
                request.on("data", function (chunk){
                    fullBody += chunk.toString();
                })
                request.on("end", function () {
                    let dataObj = JSON.parse(fullBody);
                    let drops = {};
                    for (let i=0; i<dataObj.length; i++) {
                        drops[dataObj[i].name] = dataObj[i].value;
                    }
                    writeResponse(request, response, drops)
                })
            }
            break
        case "OPTIONS":
            response.writeHead(200, "OK", {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "http://localhost:63342"
            });
            response.end();
            break
    }

    function writeResponse(request, response, data, jsonp) {
        let total = 0;
        for (let item in data) {
            if (item !== '_' && data[item] > 0) {
                total += Number(data[item])
            } else {
                delete data[item]
            }
        }
        data.total = total;
        let jsonData = JSON.stringify(data)
        if (jsonp) {
            jsonData = jsonp + "(" + jsonData + ")";
        }
        response.writeHead(200, "OK", {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:63342"
        });
        response.write(jsonData);
        response.end();
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
