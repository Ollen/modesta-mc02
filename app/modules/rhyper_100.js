const R = require('r-script');

/**
 * 
 * @param {Number} N Number of Trials 
 * @param {Number} m success
 * @param {Number} n fails
 */
const rhyper_100 = (N, m, n) => {

    let result = R('./app/scripts/rhyper_100.R')
        .data(N, m, n)
        .callSync();

    return result;
};

module.exports = rhyper_100;