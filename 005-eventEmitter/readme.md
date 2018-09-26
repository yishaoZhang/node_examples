## basic application ##
+ 一般使用
    + 引入 util
        + 为使用util.inherits
    + 引入 event
        + 将其继承至某类中
            + 注意为保证继承过程中this的唯一性
            + events.EventEmitter.call(this)
    + 事件可能与策略或命令模式配合使用，参考 basic.js
    + 注意参数传递
        + intance.emit('event', params)
        + 该参数将默认传递至 事件添加的callback中
        + 以上参考base.js
    + 引伸使用
        + 注意结合观察者模式来理解
        + 对于某个事件 可以重复添加函数
        + 对于某个事件 可以重复触发
            + 对于某个事件重复触发可以结合once 意义在于重复触发的过程中只第一次触发执行该回调
        + 删除 回调事件池中的某个回调
            + instance.removeListener('event', callback);
        + 删除该事件事件所有回调，约等删除该事件
            + instance.removeAllListeners('event')
## 上述一般问题 ##
+ event.emitter 主要解决的是当前服务下本地文件跨模块的事件处理
+ 上述未能解决与处理的问题：跨服务端（分布式集群）或redis服务等
    + node redis模块本身有 pub/sub API
    + npm 存在 signals 包，亦可解决相关问题
    + 对于分布式集群
        + AMQP（rabittmq-nodejs-client??）
        + ZMQ?