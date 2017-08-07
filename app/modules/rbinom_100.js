const R = require('r-script');

/**
 * 
 * @param {Number} N Number of Trials 
 * @param {Number} p Probability
 */
const rbinom_100 = (N, p) => {

    let result = R('./app/scripts/rbinom_100.R')
        .data(N, p)
        .callSync();

    return result;
};

module.exports = rbinom_100;