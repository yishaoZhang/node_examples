## 流的一般表述 ##
+ 流是一个特定的协议，基于事件，可读写
+ readable、writable、duplex、transform、passThrough五大流基类
    + 用流包装一个底层api i/o数据源 readable
    + 用流在程序中输出数据或者发送其它地方 writable
    + 以某种方式解析数据并有可能改变它 transform
    + 包装一个数据源（'可读'），并且其可以接收消息（'可写'）duplex
    + 从流中提取数据用于分析或测试，但不修改 passThrough
+ 可用pipe, 一般而言stream.pipe.stream()


## 一般使用场景 ##
+ 模块内置 fs.createReadStream
+ HTTP
+ 解析器
+ 浏览器
+ audio
+ 远程调用、控制、测试等

## 流的关闭与结束事件 ##
+ 关闭close
    + 资源源关闭将触发关闭
+ 结束end
    + 流目标池，已接收到足够的资源，触发结束
        + 结束事件比关闭更可靠

## 待补充 ##
+ express 中使用流
+ mongoose 中使用流
+ Mysql 中使用流 
+ cryto 模块