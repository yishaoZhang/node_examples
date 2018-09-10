var fs = require('fs');
// 显示base64 图片
// url 识别base64的基本格式为：data:[MIME-type][;chartset=<encoding>][;base64],<data>
var mime = 'image/png';
var encoding = 'base64';
var data = fs.readFileSync('./pic.png').toString(encoding);
var uri = `data:${mime};${encoding},${data}`;
//console.log(uri)

// 假设我们已经拿到uri, 保存图片
var gotUri = uri;
var gotData = gotUri.split(',')[1];
var buf = Buffer.from(data, 'base64');
fs.writeFileSync('./gotPic.png',buf);
