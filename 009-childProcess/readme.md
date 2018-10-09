## child_process模块提供了四种不同的方法来执行外部就用程序 ##
+ execFile
    + 执行外部程序，并且需要提供一组参数，以及一个在进程退出后的缓冲输出的回调,无流的概念.
    + 如果只是需要执行一个外部程序，只关心执行结查，如处理图片等，execFile是一个不错的选择。
    + 如果想对处理结果进行实时性分析，流则是一个更好的办法
+ spawn
    + 该事件基于流
    + 执行外部程序，并且需要提供一组参数，以及一个在进程退出后的输入输出和事件的数据流接口
    + 父子对称性较好
        + 子存在：child.stdin child.stdout child.stderr
        + 父存在：process.stdin process.stdout process.stderr
    + 流引入的概念，解决的问题，大量数据占据大量内存
    + 一旦有可用数据，便会响应，提高响应效率
        + 如何界定可用数据？？？
+ exec 
    + 在一个命令行窗口中执行一个或者多个命令，以及一个在进程退出后缓冲输出的回调
+ fork 
    + 在一个独立进程中执行一个node模块，并且需要提供一组参数，
    + 类似spawn方法的 数据流和事件式的接口
    + 同时可设置父进程与子进程之间的通信

## 分离父子模块 ##
+ stdio默认配置如下： stdio: ['pipe', 'pipe', 'pipe']
    + 以上分别对应： stdin stdout stderror三个流，与父进程i/o通信
+ 接上，存在可能，某些i/o需隔离（默认全开），如何实现？
    + 可以开启后关闭， 如： child.stdin.destroy(), child.stdout.destory(), child.stderror.destory()
    + 接上，亦可以使用'ignore'占位，创建是不开启，具体见 seperateChild.js
+ 父进程开启的子进程，即便是完全隔离其i/o通讯，但父进程仍会在内部存在一个对子进程的引用，如何消除
    + 采用 child.unref()方法，具体见 seperateChild.js
+ 总结(seperateChild.js)
    + 将 detached 设置成true，使子进程升级为自己的进程组头
    + 通过ignore字段，配置studio 隔离父子进程 i/o连接
    + 使用child.unref()方法，将父进程内部子进程引有计数消除

## 执行多个node程序 ##
+ 可以使用如下代码
    + const cp = require('child_process');
    + cp.execFile('node', ['myapp.js', 'myarg', 'myarg2'])
+ 亦可以 直接使用一个独立的可执行程序
    + window system
    + unix system
