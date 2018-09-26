// basic.js采用的是继承的办法，亦可以使用复制的办法。
// 通过for-in 将属性从原型对象 拷贝到另一个原型对象上
// 该方法可以对于接收到的方法进行一次过滤

var EventEmitter = require('events').EventEmitter;

function MusicPlayer(track) {
    this.track = track;
    this.playing = false;

    for (var methodName in EventEmitter.prototype) {
        this[methodName] = EventEmitter.prototype[methodName];
    }
}

MusicPlayer.prototype = {
    toString: function() {
        if (this.playing) {
            return 'now playing: ' + this.track;
        } else {
            return 'stopped';
        }
    }
}

var musicPlayer = new MusicPlayer("God is a girl");
musicPlayer.on('play', function(){
    this.playing = true;
    console.log(this.toString());
    this.emit('error', 'unable to play!');
    // 当为error时，error事件必须注册
})

// 注意上述写法无this问题
// 事件必然存在error 可以在callback中插入error然后全局监听
musicPlayer.on('error', function(err) {
    console.log(err);
})
musicPlayer.emit('play');

// error事件是全局的，同时对于异步而言，当前写法无法满足要求
