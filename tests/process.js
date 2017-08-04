var exec = require('child_process').exec;
var executableR = exec('Rscript ./app/scripts/spawn.R 10 4', function(error, stdout, stderr) {
    if(stderr) {
        console.log(stderr)
        throw stderr;
    }
    console.log(stdout);
});

module.exports = executableR;