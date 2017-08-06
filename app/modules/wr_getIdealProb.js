const R = require('r-script');

/**
 * 
 * @param {Number} p Desired Value 
 * @param {Number} n Number of Draws 
 */
const getIdealProbability_WR = (p, n) => {
    let s = 13;
    
    let result = R('./app/scripts/sum-possibilities.R')
        .data(p, n, s)
        .callSync();

    return result;
};

module.exports = getIdealProbability_WR;