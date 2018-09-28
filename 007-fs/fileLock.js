var fs = require('fs');

// 使用独占标记创建锁文件
fs.open('config.lock', 'wx', function(err){
    if (err) return console.error(err);
    // do somthing
})

// 存在需求，我们需将当前操作进程号写入文件中，以便排查
fs.writeFile('config.lock', process.pid, {flags: 'wx'},
    function (err) {
        if (err) return console.error(err);
        // do somthing!!
    }
)

// 上述独占模式在跨系统中存在不能正常工作的可能
// 接上，而mkdir 跨系统稳定
// 接上，而mkdir 无并发
// 接上，且目录已经存在时mkdir方法会失败
fs.mkdir('config.lock', function(err) {
    if (err) return console.error(err);
    fs.writeFile('config.lock', process.pid, {flags: 'wx'}, function(err) {
        if (err) return console.error(err);
        // do somthing!!!
    });
})

// 实际情况 独占后需删除。
// fs 模块如下
var hasLock = false;
var lockDir = 'config.json';
exports.lock = function (cb) {
    if (hasLock) return cb();
    fs.mkdir(lockDir, function(err) {
        if (err) return cb();
        fs.writeFile(lockDir + '/' + process.pid, function(err){
            if (err) console.error(err);
            hasLock = true;
            return cb();
        })
    })
}

exports.unlock = function(cb) {
    if (!hasLock) return cb();
    fs.unlink(lockDir + '/' + process.pid, function(err) {
        if (err) return cb(err);
        fs.rmdir(lockDir, function(err) {
            if (err) return cb(err);
            hasLock = false;
            cb();
        })
    })
}

process.on('exit', function() {
    // 此处防止系统意外
    if (hasLock) {
        fs.unlinkSync(lockDir + '/' + process.pid);
        fs.rmdirSync(lockDir);
        console.log('remove lock');
    }
})

// 如上展示上述如何使用

var locker = require('./locker');
locker.lock(function(err) {
    if(err) throw err;
    // do somthing!!
    locker.unlock(function() {
        // cb content
    })
})
