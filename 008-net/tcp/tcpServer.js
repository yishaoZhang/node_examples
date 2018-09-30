const net = require('net');
const server = net.createServer(function(soket) {
    console.log('some conects!!');
})


// chrom一般收到两次请求，一次正常请求，一次与favicon.ico有关
server.listen(8000, "127.0.0.1");

// 添加server 事件
server.on("connection", function(socket) {
    //console.log('create server on 127.0.0.1:8000');
    // 获取某些联接信息
    var address = server.address();
    console.log("the port of server is " + address.port);
    // 注意: address.address, 与 server.listen(8000, "127.0.0.1") 有关
    // 未设置虽为：127.0.0.1 但取值为 ::
    console.log("the address of server is " + address.address);
    console.log("the family of server is " + address.family);

    // 查看设置相关联接数量
    server.maxConnections = 40;
    server.getConnections(function(err, count) {
        console.log("count of client is " + count);
    });

    // 服务端向客户端发送消息
    var message = "the server address is " + JSON.stringify(address);
    // sent message
    socket.write(message, function() {
        console.log(message + 'has send');
        console.log("the size of message is " + socket.bytesWritten);
    });

    // 监听客户端发来的信息
    socket.on("data", function(data) {
        console.log(data.toString());
        console.log("the size of data is " + socket.bytesRead);
    });
    // favicon.ico chrom下会报一次错
    socket.on("error", function(err) {
        console.error(err);
    });

});

server.on("close", function() {
    console.log('server closed')
});

server.on("error", function(error) {
    console.log(error)
})

/* 
  未测试 关闭
  未实现html 与 tcp事件通信
*/