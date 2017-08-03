/**
 * Draw n number of cards per each N trials in a standard deck.
 */
const R = require('r-script');

/**
 * Returns a list containing the result of the experiment both with and without replacement.
 * 
 * @module
 * @param {Number} N A positive integer that represents the N number of trials.
 * @param {Number} n A positive integer that represents the n number of cards to draw.
 */
const drawCard = (N, n) => {
    let result = {
        trials: N,
        draws: n
    };

    // Generate Experiment with replacement.
    result.w_replacement = R('./scripts/draw-card.R')
    .data(N, n, true)
    .callSync();

    // Generate Experiment without replacment
    result.wo_replacement = R('./scripts/draw-card.R')
    .data(N, n, false)
    .callSync();

    return result;
};

module.exports = drawCard;
