var fs = require('fs');
var assert = require('assert');

fs.readdir(__dirname, function(err, files) {
    console.log(files) // [...'filsName']
})

var fd = fs.openSync('./file.txt', 'w+');
var writeBuf = new Buffer('zhangyishao you will be a great noder!!');
fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0);

var readBuf = new Buffer(writeBuf.length);
console.log(writeBuf.length, 'writeBuf.length');
// 参数说明
/* 
    fd: 被打开的文件标记
    readBuf：<buffer> 对于读来说是容器，盛放读取内容
    readBuf：<buffer> 对于写来说是容器，盛放将要写入的内容
    第一个0(offset)： 对于buffer容器的偏移量
    writeBuf.length(length): 读取或写入的长度
    第二个0(position): 对于打开的文件，从何位置进行读取或写入
*/
fs.readSync(fd, readBuf, 0, writeBuf.length, 0);

assert.equal(writeBuf.toString(), readBuf.toString());
fs.closeSync(fd);


// 利用读写流进行操作
var readable = fs.createReadStream(__dirname + '/file.txt');
var writable = fs.createWriteStream(__dirname + '/copy.txt');
readable.pipe(writable);