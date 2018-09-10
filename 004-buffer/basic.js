// 基本用法
var fs = require('fs')
fs.readFile('./names.txt', function(err, buf) {
    console.log(Buffer.isBuffer(buf));
    console.log(buf);
    console.log(buf.toString());
    console.log(buf.toString('ascii'));
})

// 采用base64 基本验证
var user = 'johnny';
var pass = 'c-bad';
var authstring = user + ':' + pass;

//var buf = new Buffer(authstring);
var buf = Buffer.from(authstring);
var encoded = buf.toString('base64');
console.log('am9obm55OmMtYmFk' === encoded);
/* 
// 该写法没有达到目的
// Buffer.from() 其格式为设置新分配内存的数据存储格式
// Buffer 实例具有 toString 方法
var encoded1 = Buffer.from(authstring, 'base64');
console.log(encoded1, encoded1 === 'am9obm550mMtYmFk') */

// 测试先开空间再写入
var buf = Buffer.alloc(64);
var len = buf.write('zhang');
var bufT = Buffer.from('zhang')
console.log(buf, len, bufT, 'buf, len, bufT');