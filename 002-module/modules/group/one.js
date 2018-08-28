function one() {
    console.log('combine1')
}

module.exports = one;

/* 
// ?? 为何不等价于上述写法？内存中未生成函数表达式？
module.exports = function() {
    console.log('combine1')
}
*/