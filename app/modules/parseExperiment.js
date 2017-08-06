/**
 * Converts the result of drawCard module into a readable JavaScript Object.
 */

/**
 * @function cardValue
 * @param {Number} n Deck Value
 * 
 * Converts a number between 1-52 into a card value ranging between 1-13.
 * e.g. (1 = Ace, 2 = Deuce, ..., 13 = King)
 */
function cardValue(n) {
    let val = n % 13;
    if (val === 0) {
        val = 13;
    }

    return val;
}

/**
 * @function cardSuite
 * @param {Number} n Deck Value
 * 
 * Returns a string that identifies the suite of the card Value.
 */
function cardSuite(n) {
    if (n <= 13)
        return 'clubs';
    else if (n <= 26)
        return 'spades';
    else if (n <= 39)
        return 'hearts';
    else
        return 'diamonds';
}

/**
 * Converts the result of drawCard module into a readable JavaScript Object
 * 
 * @module parseExperiment
 * @param {Object} experiment Object returned by the drawCard module.
 */
const parseExperiment = (experiment) => {
    // Store experiment meta-data
    let simulation = {
        trials: experiment.trials,
        draws: experiment.draws,
        desiredValue: experiment.desiredValue,
        desiredProb_wr: experiment.desiredProb_wr
    };

    var w_trials = new Array();
    var wo_trials = new Array();

    // Clean experiment results.
    for (let i = 0; i < simulation.trials; i++) {
        w_trials[i] = {card: new Array(), totalValue: 0};
        wo_trials[i] = {card: new Array(), totalValue: 0};


        for (let j = 0; j < simulation.draws; j++) {
            // Get the experiment draw value in a trial
            let w_value = experiment.w_replacement[i][j];
            let wo_value = experiment.wo_replacement[i][j];

            // Get the card and suite value.
            let w_cardData = {
                value: cardValue(w_value),
                suite: cardSuite(w_value),
                deckValue: w_value
            };
            let wo_cardData = {
                value: cardValue(wo_value),
                suite: cardSuite(wo_value),
                deckValue: wo_value
            };
            
            // Compute for the total value of the trial.
            w_trials[i].totalValue += w_cardData.value;
            wo_trials[i].totalValue += wo_cardData.value;

            // Append parsed-data into the trial arraylist.
            w_trials[i].card.push(w_cardData);
            wo_trials[i].card.push(wo_cardData);
        }
        
    }

    simulation.w_replacement = w_trials;
    simulation.wo_replacement = wo_trials;

    return simulation;
};

module.exports = parseExperiment;