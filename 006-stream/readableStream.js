// 从stream.Readable基类继承

// var Readable = require('stream').Readable;
/* 
 对于不同的基流类型，option对应不同的参数，以读流为例，参数如下：
    highWaterMark 停止读取底层数据源之前缓存数据的大小
    encoding 触发缓冲数据自动编码, 一般取值为 utf8 或 ascii
    objectMode 允许流是一个流对象，而非字节
*/
/* function MyStream(options) {
    Readable.call(this, options);
} */
// js 改继承链的一般方法
// 上述可以用 for-in
// node 环境可以util.inherits 实现
/* MyStream.prototype = Object.create(Readable.prototype, {
    constructor: {value: MyStream}
}) */

// 实现一个完整的可读流 如 JSON行解析器

var stream = require('stream');
var util = require('util');
var fs = require('fs');

/* function JSONLineReader(source) {
    stream.Readable.call(this);
    this._source = source;
    this._foundLineEnd = false;
    this._buffer = '';

    // callback 绑定回调的一般写法
    source.on('readable', function() {
        this.read(); // 对于方法调用可以不带下划线
    }.bind(this));
}

util.inherits(JSONLineReader, stream.Readable);

// 注意每次读取都是按行读？
// 每次读取都会触发 readable 事件

JSONLineReader.prototype._read = function(size) {
    var chunk;
    var line;
    var lineIndex;
    var result;

    if (this._buffer.length === 0) {
        chunk = this._source.read();
        this._buffer += chunk;
    }

    lineIndex = this._buffer.indexOf('行');
    if (lineIndex !== -1) {
        line = this._buffer.slice(0, lineIndex);
        if (line) {
            result = JSON.parse(line);
            this._buffer = this._buffer.slice(lineIndex + 1);
            this.emit('object', result);
            // this 继承于stream 存在push 方法，其作用？？？
            // 一旦 this.push 被调用， stream.Readable将会把排队的结果转发给一个消费流。
            // 这使得该流可以进一步通过管道被其它基类处理
            this.push(util.inspect(result));
        } else {
            // 为何是1？
            this._buffer = this._buffer.slice(1);
        }
    }
}

var input = fs.createReadStream(__dirname + '/json.txt', {
    encoding: 'utf8'
})

var josnLineReader = new JSONLineReader(input);
josnLineReader.on('object', function(obj) {
    console.log('line', obj.line);
}) */

// 实现一个持续可读的对象流
// ???? 为何每次执行为触发一次？？ 而又为何是三次结束？？
util.inherits(MemoryStream, stream.Readable);
function MemoryStream(options = {}) {
    options.objectMode = true;
    stream.Readable.call(this, options);
}
MemoryStream.prototype._read = function(size) {
    this.push(process.memoryUsage());
}

var memoryStream = new MemoryStream();
memoryStream.on('readable', function() {
    var output = memoryStream.read();
    console.log('Type: %s, value: %j', typeof output, output);
})