// 抛出多种方法 || 类
// exports.methods1 等价于 module.exports.methods, 详见readme.md 中 解释
exports.methods1 = function() {
    console.log('hello1 many methods')
}

module.exports.methods2 = function() {
    console.log('hello2 many methods')
}

module.exports.class1 = function() {
    this.name = 'zhang'
    console.log('hello2 many methods class1')
}