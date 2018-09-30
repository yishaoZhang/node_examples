const http = require('http');
const server = http.createServer(function(req, res) {
    console.log(req.url);
    if (req.url === '/baidu') {
        res.writeHead(302, 
            {
                "Location": "http://baidu.com"
            }
        );
        res.write("hello world, zhang noder!!\r\n");
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("hello world, zhang noder!!\r\n");
    }
    res.end();
})

server.listen(8001, "127.0.0.1", function() {
    console.log("server start on 127.0.0.1:8001")
})