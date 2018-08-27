var CountStream = require('./countstream');
var countStream = new CountStream("b");
var http = require('http');
http.get('http://www.baidu.com/', function(res) {
    res.pipe(countStream);
})

countStream.on('total', function(count) {
    console.log('total matches:', count)
})