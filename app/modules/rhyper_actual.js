const R = require('r-script');

/**
 * 
 * @param {Number} nn Number of Observations 
 * @param {Number} m successes
 * @param {Number} n failures
 * @param {Number} k draws (trials)
 * 
 */
const rhyper_actual = (nn=50, m, n, k=50) => {
    
    console.log('Simulating rhyper_actual');

    let result = R('./app/scripts/rhyper_actual.r')
        .data(nn,m,n,k)
        .callSync();

    return result;
};

module.exports = rhyper_actual;