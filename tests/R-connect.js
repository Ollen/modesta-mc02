const R = require('r-script');

let result = R('addition.R')
    .data(1,2)
    .callSync();

console.log(result);