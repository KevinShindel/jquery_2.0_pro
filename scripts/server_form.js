const http = require('http');
const queryString = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    console.log("[200 OK] " + request.method + " to " + request.url);
    if (request.method === 'POST') {
        let cType= request.headers["content-type"];
        let fullBody= "";

        if (cType && cType.indexOf("application/x-www-form-urlencoded") > -1) {
            request.on("data", function (chunk) {
                fullBody += chunk.toString();
            })
            request.on("end", function () {
                response.writeHead(200, "OK", {"Content-Type": "text/html; charset=UTF-8"})
                response.write("<html lang='RU'><head><title>POST-data</title></head>")
                response.write("<style>th, td {text-align: left; padding: 5px; color: black;}</style>")
                response.write("<body>")
                response.write("<table border='1'><caption>Данные формы</caption>")
                response.write("<tr><th>Имя</th><th>Значение</th>")
                let dBody = queryString.parse(fullBody);
                for (let prop in dBody) {
                    if (dBody[prop] > 0) {
                    response.write(`<tr><td>${prop}</td><td>${dBody[prop]}</td></tr>`)
                    }
                }
                response.write("</table></body</html>")
                response.end()

            })
        }


    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
