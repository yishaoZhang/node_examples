console.log(__dirname, '__dirname'); // 不含当前文件
console.log(__filename, '__filename'); // 含当前文件
var path = require('path');
var re = path.join(__dirname, 'zhang', 'yishao'); // 为跨系统考虑，勿手动拼接
console.log(re, 're');

console.log(path.basename('/foo/bar/zhang.html'));
console.log(path.basename('/foo/bar/zhang.html', '.html'));
console.log(path.dirname('/foo/bar/baz/asdf/quux'));
console.log(path.extname('index.html'));
console.log(path.extname('index.zhangtest'));
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));
console.log(path.resolve('/foo/bar', '/tmp/file/'));