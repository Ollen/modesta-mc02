/**
 * Draw n number of cards per each N trials in a standard deck.
 */
const R = require('r-script');

/**
 * Returns a list containing the result of the experiment.
 * 
 * @param {Number} N A positive integer that represents the N number of trials.
 * @param {Number} n A positive integer that represents the n number of cards to draw.
 * @param {Boolean} replace True if the trial performed is with repitition, otherwise False.
 */
const drawCard = (N, n, replace) => {
    return R('./../../scripts/draw-card.R')
        .data(N, n, replace)
        .callSync();
};

module.exports = drawCard;
