function one() {
    console.log('combine1')
}

module.exports = one;

// exports = one; // 得到的是空对象，因为exports相当于一普通 变量

/* 
// ?? 为何不等价于上述写法？内存中未生成函数表达式？
module.exports = function() {
    console.log('combine1')
}
*/