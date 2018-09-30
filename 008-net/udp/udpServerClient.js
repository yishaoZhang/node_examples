const dgram = require('dgram');
const fs = require('fs');
var port = 4001;
var defautlSize = 16;

function Client(remoteIp) {
    // 将文件本身传过去
    const inStream = fs.createReadStream(__filename);
    const socket = dgram.createSocket('udp4');

    inStream.on("readable", function() {
        sendData();
    });
    function sendData() {
        var message = inStream.read(defautlSize);
        if (!message) {
            return socket.unref();
        }
        socket.send(message, 0, message.length, port, remoteIp,
            function(err, bytes) {
                // 以 callback 的形式实现递归
                // 此处注意与stream 对比
                // stream 通过 实例.push() 来触发 readable事件
                // readable 事件又将 实现 实例.push()
                sendData();
            }
        )
    }
}

function Server() {
    const socket = dgram.createSocket('udp4');
    socket.on("message", function(msg, rinfo) {
        process.stdout.write(msg.toString());
    });

    socket.on("listening", function() {
        console.log("server ready:", socket.address());
    });

    socket.bind(port);
}
// 运行命令 node **.js client 127.0.0.1
if (process.argv[2] === 'client') {
    new Client(process.argv[3]);
} else {
    new Server();
}