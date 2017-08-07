let rawExperiment = getRaw();
let parsedExperiment = getParsed();

let totalDesired_WR = 0;
let totalDesired_WOR = 0;

let actualProb_WR = 0;
let actualProb_WOR = 0;


$(document).ready(function () {
    $('.i_p_wor').text(parsedExperiment.desiredProb_wor[1]);
    $('.i_p_wr').text(parsedExperiment.desiredProb_wr[1]);
    
    // Get Actual Frequency for both with and without
    for (let i = 0; i < parsedExperiment.trials; i++) {
        if(parsedExperiment.w_replacement[i].totalValue == parsedExperiment.desiredValue) {
            totalDesired_WR = totalDesired_WR + 1;
        }

        if(parsedExperiment.wo_replacement[i].totalValue == parsedExperiment.desiredValue) {
            totalDesired_WOR = totalDesired_WOR + 1;
        }
    }
    actualProb_WOR = totalDesired_WOR / parsedExperiment.trials;
    actualProb_WR = totalDesired_WR / parsedExperiment.trials;
    
    $('.a_p_wor').text(actualProb_WOR.toFixed(4));
    $('.a_p_wr').text(actualProb_WR.toFixed(4));

    
});