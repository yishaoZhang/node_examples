const cp = require('child_process');

/* cp.execFile('echo', ['hello', 'world'], 
    function(err, stdout, stderr) {
        if (err) console.error(err);
        console.log('stdout', stdout);
    }
) */
// 测试error事件
cp.execFile('ls', ['non-existent-directory-to-list'],
    function(err, stdout, stderr) {
        console.log(err.code);
        console.log(stderr);
    }
)

// 问题？ 为何第二部分先执行？
// 流加快了速据响应，一旦存在可用数据，便被使用
// 之前对于数据流理解不对
var child = cp.spawn('echo', ['zhang', 'yishao']);
child.on('error', console.error);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

// 实现信息读取，排序，输出
var cat = cp.spawn('cat', ['messy.txt']);
var sort = cp.spawn('sort');
var uniq = cp.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);