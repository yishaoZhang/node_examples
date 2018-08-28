## 学习 ##
+ commonJS 模块规范， AMD 模块规范
+ node require原理（原码）
+ node 特性及代码更新

## js模块 ##
+ commonJS
    + node 取舍 commonJS 后，本地模块加载规范
    + 同步
    + 输出的是值拷贝
+ amd
    + 在浏览器环境下，采用commonJS的同步形式，文件加载将阻塞DOM渲染
    + 因此采用异步方式
        + 具体方式便是 文件加载 放入callback，在callback中执行业务
    + 上述 如果不采用amd 可以如下代替
        + JS 文件写在html 底部   
        + \<script src="js file url" defer async="true"></script>
            + async 表示采用异步加载
            + ie 不支持 async, 支持 defer
    + require.js amd代表，入口用法
        + \<script src="js file url" data-main="js/main"></script>
            + data-main 指出网页程序的入口，该入口唯一
+ es6 模块
    + 目前（2018-08）浏览器不支持
    + 可以理解为其在node环境下执行, 由此可知 其与commonJS语法上不一致，理念上一致
        + es6 与 commonJS 重要区别
        + es6 输出的是对值的引用
        + commonJS 输出的是对值的复制

## js实现 require函数 ##
```
function require(...params) {
  const module = { exports: {} }
  ((module, exports) => {
      function someFun() {
        
      }
      exports = someFun
      module.exports = exports
  })(module, module.exports)
  return module.exports
}
```
> require 完整写法
```javascript
function $require(id) {
    const fs = require('fs');
    const path = require('path');
    const filename = path.join(__dirname, id);
    $require.cache = $require.cache || {};

    // if cache
    if ($require.cache[filename]) {
        return $require.cache[filename].exports;
    }

    // no cache
    const dirname = path.dirname(filename);
    let code = fs.readFileSync(filename, 'utf8');
    let module = {id: filename, exports: {}}
    let exports = module.exports
    code = `
    (function($require, module, exports, __dirname, __filename) {
    ${code}
    })($require, module, exports, dirname, __filename)
    `
    eval(code)

    // cache module
    $require.cache[filename] = module
    return module.exports;
}
```

## node module features ##
+ require.main
    + 入口标记
        + require.main === module // 判断是否为主入口
        + require.main.file // 入口文件的绝对路径
+ require会有缓存，多次加载最终最会被加载一次
    + 如何清？
        + require.cache[moduleName]的方式来操作cache
        + require.cache[moduleName] 保持着对module cache的引用，而非缓存本身
+ 生产环境一般使用 pm2
```
// require.cache[moduleName]清缓存 示意
setTimeout(function(){
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    })
    var oneClass = require('./modules/oneClass');
}, 1000)
```
