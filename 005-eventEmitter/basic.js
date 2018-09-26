var util = require('util');
var events = require('events');
var AudioDevice = {
    play: function(track) {
        console.log(track);
    },
    stop: function() {

    }
};

function MusicPlayer() {
    this.playing = false;
    // 此处重要，见readme.md解释
    events.EventEmitter.call(this); // quote this to MusicPlayer
}

util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();
musicPlayer.on('play', function(track) {
    this.playing = true;
    AudioDevice.play(track);
})
musicPlayer.on('play', function(track) {
    console.log(1);
})
// 此处不可以用箭头，因为将全局this重置为当前执行环境(外围)this
/* musicPlayer.on('play', () => {
    console.log(this.constructor === musicPlayer, 'this')
}) */

musicPlayer.on('stop', function() {
    this.playing = false;
    AudioDevice.stop();
})

function removeF(str) {
    console.log(str)
}

musicPlayer.on('removeE', function() {
    console.log('remove')
})
musicPlayer.on('removeE', removeF)

// test 重复添加
/* musicPlayer.emit('play', 'playing start');
musicPlayer.emit('play', 'playing start again'); */

// 测试 removeListener removeAllListeners
/* musicPlayer.emit('removeE', 'zhang')
musicPlayer.removeListener('removeE', removeF)
musicPlayer.emit('removeE')
musicPlayer.removeAllListeners('removeE')
musicPlayer.emit('removeE')
musicPlayer.emit('play', 'playing still can use') */

// test once
/* musicPlayer.once('play', function() {
    console.log('once')
})
musicPlayer.emit('play', 'test once');
musicPlayer.emit('play', 'test once again'); */