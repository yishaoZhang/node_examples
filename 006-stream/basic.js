var http = require('http');
var fs = require('fs');

/* http.createServer(function(req, res) {
    fs.readFile(`${__dirname}/index.html`, function(err, data) {
        if (err) {
            res.statusCode = 500;
            res.end(String(err));
        } else {
            res.end(data);
        }
    }) 
}).listen(8000, "127.0.0.1", () => {
    console.log('server is started normally!');
}); */

// 使用流实现
// 注意只是以流的形式返回index.html
http.createServer(function(req, res) {
    // 上述路径错误，使用try catch当前执行无进程crash，多次循环或异步需谨慎。
    /* try {
        fs.createReadStream(`${__dirname}/index1.html`).pipe(res);
    }
    catch (err) {
        res.end(String(err));
    } */
    
    // 官方案例
    /* fs.createReadStream(`${__dirname}/index.html`).pipe(res); */

    // 测试stream常见事件及与pipe配合使用
    let readStreamE = fs.createReadStream(`${__dirname}/index1.html`);
    let readStream = fs.createReadStream(`${__dirname}/index.html`);
    // 注意错误捕获try-catch无法避免crash
    readStreamE.on('error', (err) => {
        console.trace();
        console.log('error');
    })
    readStream.on('open', (fd) => {
        // fd 表示文件描述符
        console.log('open', fd);
    })
    readStream.on('ready', () => {
        console.log('ready');
    })
    readStream.on('data', (chunk) => {
        console.log('data', chunk);
    })
    // 此内置存在pipe方法，不存在pipe事件
    /* readStream.on('pipe', () => {
        console.log('pipe');
    }) */
    readStream.pipe(res);
    
    readStream.on('end', () => {
        console.log('end');
    })
    readStream.on('close', () => {
        console.log('close');
    })

    
}).listen(8000, "127.0.0.1", () => {
    console.log("server is started using stream!")
})