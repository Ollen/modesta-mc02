const R = require('r-script');

/**
 * 
 * @param {Number} N Number of Trials 
 * @param {Number} p Probability
 */
const rbinom_actual = (N, p) => {

    let result = R('./app/scripts/rbinom_desired_actual.R')
        .data(N, p)
        .callSync();

    return result;
};

module.exports = rbinom_actual;