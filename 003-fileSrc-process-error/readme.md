## 学习 ##
+ 文件路径一般使用
+ console 一般使用
+ process 对象
+ 异步异常处理

## 路径 ##
+ __dirname // 程序执行入口，绝对路径不包含当前
+ __filename // 程序执行入口，含当前
+ path 常用
    + path.basename(path[, ext])
        + path('/a/b.html') // b.html
        + path('/a/b.html', '.html') // b
    + path.dirname(path) // 参考__dirname, 以传入路径计算
        + path.dirname('/foo/bar/baz/asdf/quux') // '/foo/bar/baz/asdf'
    + path.extname(path) // 返回 path 扩展名
        + path.extname('index.coffee.md'); // .md
    + path.isAbsolute(path) // 返回绝对路径
    + path.join([...paths])
        + 路径间分隔符不跨系统，相对人工，可跨系统
    + path.relative(from, to) // 返回两个路径间相对路径
        + path.relative('/data/orandea/aaa', '/data/orandea/impl/bbb') // ../impl/bbb

## process 以象 ##
+ 事件
    + exit // 进程退出时触发
    + uncaughtException // 捕获那些没有try catch的异常错误, !!!注意进程退出时才处理错误
    + SIGINT // 捕获当前进程收到的信号
+ process.stdout // 一个指向输出的可写流
+ process.stderr // 一个指向标准错误流的可写流
+ process.stdin // 一个指向标准输入的可读流
+ process.argv // 返回当前命令行指参数
    + 通常第一个元素 node
    + 第二个元素： 执行文件 绝对路径
    + 其后： 输入参数
+ process.abort() // 触发node abort事件
+ process.env // 当前系统信息，环境变量，用户等
+ process.exit([code]) // 终止进程并返回给定的code
+ process.pid // 获取当前进程的pid
+ process.kill(pid, [signal]) // 结束对应某pid进程并发送一个信号
+ process.title // 获取或设置当前的标题名称
+ process.memoryUsage() // node进程的内存使用情况，单位bytes
+ process.nextTick(callback)
    + Eventloop下一次循环中调用callback
    + 注意它将在I/O操作之前先执行
+ Unix 系统独有
    + process.getgid() // 获取群组标识ID
    + process.setgid(id)
    + process.getuid() // 获取执行进程的用户ID
    + process.setuid(id)
    + process.getgroups() // 返回 supplementary group ID
    + process.setgroups(groups)

## 异步异常处理 ##
```
// 同步异常
var sync = function() {
    throw new Error('wrong!!!')
}
// 异步异常
var async = function(callback) {
    // do sync thing
    process.nextTick(function() {
        throw new Error("wrong")
        callback()
    })
}

// 处理同步异步
try {
    sync()
} catch(err) {
    console.log(err.message)
}
// 接上，采用相同的方法处理异步异常则捕获不到
try {
    async()
} catch(err) {
    console.log(err.message)
}
// 接上，异步异常如何处理？
// 方法一： 遵守 node error优先原则，通过callback来执行（通用方法建议）
var async = function(callback) {
    // do sync thing
    process.nextTick(function() {
        var error = new Error('wrong!!!');
        callback(error)
    })
}
async(function(err){
    if (err) {
        console.log(err.message);
        return
    }
    // do something!
})

// 方法二：使用domain模块 创建一个子域（js运行子环境）
// 不建议，将被废弃
var domain = require('domain').create();
domain.on("error", function(err){
    console.log('err.message')
})
domain.run(function(){
    async()
})

// 方法三： 利用process uncaughtException 事件
// 因为error事件将在退出事被执行，所以该方法在生产环境不满足使用要求
var async = function(callback) {
    // do somthing
    process.nextTick(function(){
        throw new Error('wrong!!!')
        callback()
    })
}
process.on('uncaughtException', function(err){
    console.log(err.message);
})
```
     