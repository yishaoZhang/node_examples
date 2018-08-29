// 标准输入流默认暂停， 通过process.stdin.resume()激活
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(text) {
    process.stdout.write(text.toUpperCase());
})