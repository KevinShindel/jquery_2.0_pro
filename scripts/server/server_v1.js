const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server_v1 = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end('Hello World');
});

server_v1.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
