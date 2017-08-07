const R = require('r-script');

/**
 * 
 * @param {Number} n Number of Draws 
 * @param {Number} d Desired Value
 */
const getIdealProb_WOR = (n, d) => {
    console.log(typeof(n));
    console.log(typeof(d));
    
    let result = R('./app/scripts/sum-possibilities-wor.R')
        .data(n, d)
        .callSync();

    return result;
};

module.exports = getIdealProb_WOR;