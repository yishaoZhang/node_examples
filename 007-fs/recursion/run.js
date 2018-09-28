// var finder = require('./recursionSync');

// try {
//     var results = finder.findSync(/file.*/, __dirname + '/root');
//     console.log(results);
// } catch (err) {
//     console.error(err);
// }

const finder = require('./recursion');
finder.find(/file.*/, __dirname + '/root', function(err, results) {
    if (err) return console.error(err);
    console.log(results);
})