## 基本说明 ##
+ fs模块包含常规的POSIX文件操作的封装，以及批量操作、流和监听
+ POSIX文件
    + 暂时了解，暂理解为 是一种文件标准，基于C语言，内有很多低级别的API封装
+ fs继承于POSIX文件系统，即fs含有POSIX标准下诸多底层方法

## 基本方法 ##
+ fs.rename 改文件名
+ fs.truncate 截断或扩展文件到指定长度
+ fs.chown 改变文件的所有者以及组
+ fs.chmod 修改文件权限
+ fs.stat 获取文件状态
+ fs.link 创建一个硬链接
+ fs.symlink 创建一个软链接
+ fs.readlink 读取一个软连接的值
+ fs.realpath 返回规范的绝对路径
+ fs.unlink 删除文件
+ fs.rmdir 删除文件目录
+ fs.mkdir 创建文件目录
+ fs.readdir 读取一个文件目录的内容
+ fs.close 关闭一个文件描述
+ fs.open 打开一个文件，用来取读或写入
+ fs.utimes 设置文件的读取和修改时间
+ fs.fsync 同步磁盘中的文件数据
+ fs.write 写入数据到一个文件
+ fs.read 读取一个文件的数据

## 配制文件 ##
> 假设存在一个JSON config文件
+ 最初做法：异步读取 然后将文件内容放置于 callback中进行验证调用
    + callback中无法捕获异常
+ 同步打开读取
    + 存在一定的性能问题
        + 单任务来讲同步快一些，但同步是存在阻塞的
        + 说同步性能问题，主要是业务系统肯定存在并发
    + 可以用try-catch
+ var config = require('config.json')
    + 与同步类似
    + ？？若后期修改，将引发全局修改？难以追踪BUG
    + 使用Object.freeze() // 浅冻结，对json结构有一定的要求
+ 场景需求要确认，存在要求配置读取出错crash情况，注意pm2配置。
+ 接上 亦存在配置出问题，系统正常的问题
    + 进数据库是一个可进可退的方案

## 文件描述 ##

## 第三方独占模块lockfile ##

## file recursion ##
+ readdir
+ readdirSync
    + 同步的方法快一些。但是会阻塞
    + 碰到很大的文件目录会执行失败，因为JS没有合适的尾调？？？
    + callback files参数，本身即为数组字符串
+ find
    + 对readdir进行封装，主要是消除内存中队列
        + 详见recursion相关代码
    + 相对慢一些
    + 不会阻塞
    + 可以应对大型目录


