const http = require('http');
const queryString = require('querystring');
const url = require("url");
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    console.log("[200 OK] " + request.method + " to " + request.url);
    switch (request.method) {
        case "GET":
            let data = url.parse(request.url, true).query;
            writeResponse(request, response, data, data['callback']);

            let flowerData = {
                "aster": {plural: "астр", stock: 10, price: 2.99},
                "daffodil": {plural: "нарцисов", stock: 12, price: 1.99},
                "rose": {plural: "роз", stock: 2, price: 4.99},
                "peony": {plural: "пионов", stock: 0, price: 1.5},
                "primula": {plural: "примул", stock: 1, price: 3.12},
                "snowdrop": {plural: "подснежников", stock: 15, price: 0.99},
                "carnation": {plural: "гвоздик", stock: 15, price: 1.99},
                "lily": {plural: "лилий", stock: 15, price: 3.99},
                "orchid":{ plural: "орхидей", stock: 15, price: 2.99}
            }
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
