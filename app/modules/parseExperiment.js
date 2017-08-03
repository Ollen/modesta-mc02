/**
 * Converts the result of drawCard module into a readable JavaScript Object.
 */

function cardValue(n) {
    let val = n % 13;
    if (val === 0) {
        val = 13;
    }

    return val;
}

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
 * @module
 * @param {Object} experiment Object returned by the drawCard module.
 */
const parseExperiment = (experiment) => {
    // Store experiment meta-data
    let simulation = {
        trials: experiment.trials,
        draws: experiment.draws
    };

    var w_trials = new Array();
    var wo_trials = new Array();

    // Clean experiment results.
    for (let i = 0; i < simulation.trials; i++) {
        w_trials[i] = new Array();
        wo_trials[i] = new Array();

        for (let j = 0; j < simulation.draws; j++) {
            let w_value = experiment.w_replacement[i][j];
            let wo_value = experiment.wo_replacement[i][j];

            let w_cardData = {
                value: cardValue(w_value),
                suite: cardSuite(w_value),
                card: w_value
            };
            let wo_cardData = {
                value: cardValue(wo_value),
                suite: cardSuite(wo_value),
                card: wo_value
            };

            w_trials[i].push(w_cardData);
            wo_trials[i].push(wo_cardData);
        }
    }

    simulation.w_replacement = w_trials;
    simulation.wo_replacement = wo_trials;

    return simulation;
};

module.exports = parseExperiment;