const http = require('http')
const server = http.createServer((request, response) => {
    Math.random() > 0.5 ? errorMethod() : '2'
    response.end('Hello Cluster')
})

if (!module.parent) {
    server.listen(3000);
    console.log('app started at port 3000...');
} else {
    module.exports = server
}