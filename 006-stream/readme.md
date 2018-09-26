## 流的一般表述 ##
+ 流是一个特定的协议，基于事件，可读写
+ readable、writable、duplex、transform四大类应用场景
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