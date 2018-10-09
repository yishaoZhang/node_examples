var fs = require('fs');
var cp = require('child_process');

var outFd = fs.openSync('./longrun.out', 'a');
var errFd = fs.openSync('./longrun.err', 'a');

var child = cp.spawn('./longrun', [], {
    detached: true, 
    stdio: ['ignore', outFd, errFd]
})
child.unref();