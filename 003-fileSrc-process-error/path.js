console.log(__dirname, '__dirname'); // 不含当前文件
console.log(__filename, '__filename'); // 含当前文件
var path = require('path');
var re = path.join(__dirname, 'zhang', 'yishao'); // 为跨系统考虑，勿手动拼接
console.log(re, 're');