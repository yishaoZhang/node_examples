var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;
util.inherits(CountStream, Writable); // 继承Writable后，实例可做为 pipe 实例

function CountStream(matchText, options) {
    Writable.call(this, options);
    this.count = 0;
    this.matcher = new RegExp(matchText, 'ig'); // i 忽略大小写, g 全局
}

CountStream.prototype._write = function(chunk, encoding, cb) {
    var matches = chunk.toString().match(this.matcher);
    if (matches) {
        this.count += matches.length;
    }
}
CountStream.prototype.end = function() {
    this.emit('total', this.count)
}