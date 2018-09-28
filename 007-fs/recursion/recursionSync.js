const fs = require('fs');
const join = require('path').join;

exports.findSync = function(nameRe, startPath) {
    var results = [];
    function finder(path) {
        var files = fs.readdirSync(path);
        for (var i = 0; i < files.length; i++) {
            var fpath = join(path, files[i]);
            var stats = fs.statSync(fpath);
            if (stats.isDirectory()) finder(fpath);
            if (stats.isFile() && nameRe.test(files[i])) results.push(fpath);
        }
    }
    finder(startPath);
    return results;
}

/* 
    注意：改代码只是解决了批量处理相对大数量的异步任务，
    通过记数的形式，来最终指示所有的异步任务完成时，输出最终结果。
    但其实没有解决：内存仍需同步的维持该批量任务队列，若数量值达到阀值（不存在临界点阀值，但存在一定量级后内存写入及任务处理越来越慢）
    内存将会爆掉。
*/