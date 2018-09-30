const assert = require('assert');
const dgram = require('dgram');
const fs = require('fs');
const defaultSize = 16;
var port = 4002;

function Client(remoteIp) {
    var socket = dgram.createSocket('udp4');
    var readline = require('readline');
    var rl = readline.createInterface(process.stdin, process.stdout);

    socket.send(new Buffer('<JOIN>'), 0, 6, port, remoteIp);

    // 设置每次信息提示
    rl.setPrompt("Message>");
    rl.prompt();

    // 这个是每次输入
    rl.on('line', function(line) {
        sendData(line);
    }).on("close", function() {
        process.exit(0);
    });

    socket.on("message", function(msg, rinfo) {
        console.log(`\n<${rinfo.address}>`, msg.toString());
        rl.prompt();
    })

    function sendData(message) {
        socket.send(new Buffer(message), 0, message.length, port, remoteIp,
            function(err, bytes) {
                console.log('Sent:', message);
                rl.prompt();
            }
        )
    }
}

function Server() {
    var clients = [];
    var server = dgram.createSocket('udp4');
    server.on('message', function(msg, rinfo) {
        var clientId = rinfo.address + ':' + rinfo.port;
        var msg = msg.toString();
        if (!clients[clientId]) {
            clients[clientId] = rinfo;
        }

        if (msg.match(/^</)) {
            console.log("control message: ", msg);
            return;
        }

        for (var client in clients) {
            if (client !== clientId) {
                client = clients[client];
                server.send(
                    new Buffer(msg), 
                    0,
                    msg.length,
                    client.port,
                    client.address,
                    function(err,bytes) {
                        if (err) console.error(err);
                        console.log('Bytes sent: ', bytes);
                    }
                );
            }
        }
    });

    server.on('listening', function() {
        console.log('server ready: ', server.address());
    });
    server.bind(port);
}

module.exports = {
    Client: Client,
    Server: Server
}

// 如果其被其它模块引用，则存在module.parent值
// 如果作为主程序入口执行则无文件
// 如果被其它文件引用，则指向引用他的那个文件
if (!module.parent) {
    switch (process.argv[2]) {
        case 'client': 
            new Client(process.argv[3]);
            break;
        case 'server':
            new Server();
            break;
        default:
            console.log('unkown option');
    }
}