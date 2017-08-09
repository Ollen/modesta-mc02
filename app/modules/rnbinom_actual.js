const R = require('r-script');

/**
 * 
 * @param {Number} N Number of Trials 
 * @param {Number} p Probability
 * @param {Number} s size
 */
const rnbinom_actual = (N, p, s=1) => {

    let result = R('./app/scripts/rnbinom_desired_actual.R')
        .data(N, p, s)
        .callSync();

    return result;
};

module.exports = rnbinom_actual;