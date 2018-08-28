// 只包含一个类
function oneClass() {

}
oneClass.prototype = {
    say: function() {
        console.log('hello world! oneClass')
    }
}
console.log('test cache')
var myClass = new oneClass();
// module.exports = myClass; 注意 module 规范， 大部分情况下不建议实例
module.exports = oneClass;