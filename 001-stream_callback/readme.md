## 了解 ##
+ util 模块
+ stream 模块
+ 流事件/pipe方法

## 学习 ##
+ util.inherits 原理
    + util.inspect(object,[showHidden],[depth],[colors]) // 对象转化为字符串输出
    + util.isArray(object)
    + util.isRegExp(object)
    + util.isDate(object)
    + util.isError(object) // 是否为error对象
+ CountStream 承继 Writable 后，实例做为 callback 放在pipe // 重要，十分重要
+ CountStream 构造函数通过util.inherits 继承可写流后，相关流事件将会触发 CountStream prototype 同名方法。。如end ???? 
+ eventEmitter 传参
+ 复用 assort 原始测试的一般写法
```
// util.inherits() 一般原理
util.inherits = function(constructor, superConstructor) {
    constructor.super_ = superConstructor; // super_？？
    constructor.prototype = Object.create(superConstructor.prototype, {
        constructor: {
            value: constructor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    })
}
// 两层含意：1 子类可以通过'super_'使用父类；2 父类继承链同时转移至子类
```
