const fs = require('fs');
const join = require('path').join;

exports.find = function(nameRe, startPath, cb) {
    var results = [];
    var asynOps = 0;
    var errored = false;

    function error(err) {
        if (!errored) cb(err);
        errored = true;
    }

    function finder(path) {
        asynOps++;
        fs.readdir(path, function(err, files) {
            if (err) return error(err);
            files.forEach(function(file) {
                var fpath = join(path, file);
                asynOps++;
                fs.stat(fpath, function(err, stats) {
                    if (err) return error(err);
                    if (stats.isDirectory()) finder(fpath);
                    if (stats.isFile() && nameRe.test(file)) results.push(fpath);
                    asynOps--;
                    console.log(asynOps, 'async')
                    if (asynOps === 0) cb(null, results);
                })
            })
            asynOps--;
            console.log(asynOps, 'out')
            if (asynOps === 0) cb(null, results);
        })
    }
    finder(startPath);
}