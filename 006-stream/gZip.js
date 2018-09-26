var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

http.createServer(function(req, res) {
    // 需让浏览器了解开器gzip加密
    res.writeHead(200, {'content-encoding': 'gzip'});
    fs.createReadStream(__dirname + '/index.html')
        .pipe(zlib.createGzip())
        .pipe(res);
}).listen(8000, "127.0.0.1", () => {
    console.log('server is started using gzip!')
})