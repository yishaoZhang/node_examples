const net = require("net");
const client = net.Socket();

client.connect(8000, "127.0.0.1", function() {
    console.log("client connect the server!");
    setInterval(function() {
        client.write("client: message from client");
    }, 1000);
});

client.on("data", function(data) {
    console.log("data of server is " + data.toString());
})

client.on("end", function() {
    console.log("client data end")
});