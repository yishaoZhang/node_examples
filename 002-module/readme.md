## 学习 ##
+ commonJS 模块规范， AMD 模块规范
+ node require原理（原码）
+ node 特性及代码更新
+ require 查找文件规则

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
    + require.resolve(id) // 可以返回文件的绝对路径
        + 因此清除写法亦可如下：
            + delete require.cache(require.resolve(id))
+ 生产环境一般使用 pm2, ??
```
// require.cache[moduleName]清缓存 示意
setTimeout(function(){
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    })
    var oneClass = require('./modules/oneClass');
}, 1000)
```

## require 查找文件规则 ##
+ 以./ ../ 或 /开头（./ ../ 相对路径， /绝对路径）
    + 文件夹（其权限大于带后缀文件名）
        + 默认index.js
        + package.json{main: 'str'} main路径存在，则main路径下的文件 权限大于 index.js
        + 接上可配相关依赖 
    + 无后缀 （权限小于同名文件夹） 
        + .js > .json > .node
+ 无/(filename, not srcc)
    + 以当前目录为基准向上查找，如果当前目录及父级以上存在「node_modules」即可
    + 通过命令 process.mainModule.paths 可查看所有醒找路径
    + mac 系统可以通过 which 'moduleName' 查看module全局安装路径
        + 上述命令不准
            + cnpm ls -g --depth 0
            + 注意打印省略 node_modules
+ 如何更改 npm 全局安装路径配置？？？