var oneClass = require('./modules/oneClass');
var oneClassIns = new oneClass();
oneClassIns.say();

var manyMethods = require('./modules/manyMethods');
manyMethods.methods1();
manyMethods.methods2();
new manyMethods.class1();

var combine = require('./modules/combine');
combine.two.combineFun();
combine.one();
/* 
// 以下代码测试缓存
*/
setTimeout(function(){
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    })
    var oneClass = require('./modules/oneClass');
}, 1000)

