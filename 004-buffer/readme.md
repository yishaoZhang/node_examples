## 产生原因 ##
+ javascript 语言本身只有字符串数据类型，没有二进制数据类型。但是在处理TCP流或文件流的时候，必须使用二进制数据，所以Node定义了Buffer类
+ Buffer 位于v8 内存之外
+ v6.0后，建议用 Buffer.from 代替 new Buffer

## 一般使用 ##
+ Buffer.from(data[,charset=<utf8>])
    + 上述操作实际上是为data 开辟内存空间, 可以理解为返回的是该空间地址
    + 接上，同样可以,先开辟空间，然后存储
    + 一般写法Buffer.from().write(string\[, offset]\[, length]\[, encoding])
        + var buf = Buffer.alloc(len);
        + var len = buf.write('str');
+ Buffer.from(data[,charset=<utf8>), 疑问：都说Buffer是二进制存储了，为何还要引入 charset??
    + 数据还是2进制，主要是为了输出标记，即当输出这个Buffer二进制数据的的时候，按约的格式标记输出
    + 注意与Buffer.from().toString([chartset=<utf8>])区分
        + 该命令是将Buffer二进制做格式转化输出