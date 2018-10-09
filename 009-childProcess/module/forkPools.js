// fork pool
const cp = require('child_process');
/* const child = cp.fork('./child');
// parent listen child
child.on('message', function(msg) {
    console.log(`got a message from child: ${msg}`);
});

// sent message won't lose its format
child.send(`sending a message from child`)

// disconnect IPC channel
// child.disconnect(); */

// wrap above
// when parent process allocate a task to child, we need to know allocation's result
// child process may closed by some results or error
/* function doWork(job, cb) {
    var child = cp.fork('./worker');
    child.send(job);
    child.once('message', function(result) {
        cb(null,  result);
    });
    child.once('error', function(err) {
        cb(err);
        child.kill();
    });
    child.once('exit', function(code, signal) {
        cb(new Error(`child exited with code: ${code}`));
    });
} */

// error or exit message and send was triggered once is ok
// but above code may be executed multiply
// so reconstructed as blow:
/* function doWord(job, cb) {
    var child = cp.fork('./worker');
    var cbTriggered = false;
    child
        .once('error', function(err) {
            if (!cbTriggered) {
                cbTriggered = true;
            }
            child.kill();
        })
        .once('exit', function(code, signal) {
            if (!cbTriggered) {
                cb(new Error(`child exited with code: ${code}`))
            }
        })
        .once('message', function(result) {
            cb(null, result);
            cbTriggered = true;
        })
        .send(job);
} */

// final fork pools
const cpus = require('os').cpus().length;
module.exports = function(workModule) {
    var awaiting = [];
    var readyPool = [];
    var poolSize = 0;

    return function doWork(job, cb) {
        if (!readyPool.length && poolSize > cpus) {
            return awaiting.push([doWork, job, cb]);
        }
        var child = readyPool.length ? readyPool.shift() : (poolSize++, cp.fork(workModule));
        var cbTriggered = false;
        child
            .removeAllListeners()
            .once('error', function(err) {
                if (!cbTriggered) {
                    cb(err);
                    cbTriggered = true;
                }
                child.kill();
            })
            .once('exit', function(code) {
                if (!cbTriggered) {
                    cb(new Error(`child exited with code ${code}`))
                }
                poolSize--;
                var childIdx = readyPool.indexOf(child);
                if (childIdx > -1) readyPool.splice(childIdx, 1);
            })
            .once('message', function(msg) {
                cb(null, msg);
                cbTriggered = true;
                readyPool.push(child);
                if (awaiting.length) {
                    setImmediate.apply(null, awaiting.shift());
                }
            })
            .send(job);
    }
}



