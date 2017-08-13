const R = require('r-script');

/**
 * 
 * @param {Number} N Trials 
 * @param {Number} m successes
 * @param {Number} n failures
 * 
 */
const rhyper_ideal = (p=50, m, n) => {

    console.log('Simulating rhyper_ideal');
    let result = R('./app/scripts/rhyper_ideal.r')
        .data(p, m, n)
        .callSync();

    return result;
};

module.exports = rhyper_ideal;