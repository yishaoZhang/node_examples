
var stream = require('stream');
// 实现一个写流
// 对于写流一般采用继承的方式
/* GreenStream.prototype = Object.create(stream.Writable.prototype, {
    constructor: {value: GreenStream}
});

function GreenStream(options) {
    stream.Writable.call(this, options);
}

GreenStream.prototype._write = function(chunk, encoding, callback) {
    process.stdout.write('u001b[32m' + chunk + 'u001b[39m');
    callback();
}

process.stdin.pipe(new GreenStream()); */

// 实现一个双工流
HungryStream.prototype = Object.create(stream.Duplex.prototype, {
    constructor: {value: HungryStream}
})
function HungryStream(options) {
    stream.Duplex.call(this, options);
    this.waiting = false;
}

HungryStream.prototype._write = function(chunk, encoding, callback) {
    this.waiting = false;
    this.push(chunk);
    callback();
}
HungryStream.prototype._read = function(size) {
    if (!this.waiting) {
        this.push('Feed me data! > ');
        this.waiting = true;
    }
}

var hungeryStream = new HungryStream();
process.stdin.pipe(hungeryStream).pipe(process.stdout);