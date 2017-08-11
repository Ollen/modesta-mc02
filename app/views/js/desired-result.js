let rawExperiment = getRaw();
let parsedExperiment = getParsed();

let totalDesired_WR = 0;
let totalDesired_WOR = 0;

let actualProb_WR = 0;
let actualProb_WOR = 0;

function createRbinom() {
    let rbinom = getRbinom_100();
    // let freq = [];
    // let label = []
    // for(let i = 0; i < 100; i++){
    //     label[i] = i + 1;
    //     if(rbinom[0][i] != null) {
    //         freq[rbinom[0][i] - 1] = rbinom[1][i];
    //     } else if(freq[i] == null){
    //         freq[i] = 0;
    //     }

    // }

    let data = {
        labels: rbinom[0],
        series: [rbinom[1]]
    };

    let g1 = new Chartist.Line('#rbinom', data, {
        showArea: true
    });
}

function createRhyper() {
    let rhyper = getRhyper_100();

    let data = {
        labels: rhyper[0],
        series: [rhyper[1]]
    };

    let g1 = new Chartist.Line('#rhyper', data, {
        showArea: true
    });

}

function displayWays() {
    let permutation = parsedExperiment.desiredProb_wr[0] + "/" + permutationTotalList[rawExperiment.draws];
    let combination = parsedExperiment.desiredProb_wor[0] + "/" + combinationTotalList[rawExperiment.draws];
    
    $('.perm-ways').text(permutation);
    $('.comb-ways').text(combination);

}

$(document).ready(function () {
    let desiredValue = rawExperiment.desiredValue;
    $('.desired-value').text(desiredValue);
    displayWays();


    createRbinom();
    createRhyper();
    $('desiredVal').text(parsedExperiment.desiredValue);
    $('.i_p_wor').text(parsedExperiment.desiredProb_wor[1].toFixed(4));
    $('.i_p_wr').text(parsedExperiment.desiredProb_wr[1].toFixed(4));
    
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