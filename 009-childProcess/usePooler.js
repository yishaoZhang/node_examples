const http = require('http');
const makePool = require('./module/forkPools');
const runJob = makePool('./module/worker');

http.createServer(function(req, res) {
    runJob('some dummy job', function(err, data) {
        if (err) return res.end(`got an error: ${err.message}`);
        res.end(data);
    });
}).listen(3001);