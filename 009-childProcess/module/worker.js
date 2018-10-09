process.on('message', function(job) {
    var time = new Date();
    while (new Date() - time < 1000) {}
    process.send(`finished ${job}`);
});