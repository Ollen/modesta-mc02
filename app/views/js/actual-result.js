let rawExperiment = getRaw();
let parsedExperiment = getParsed();


function createG1 () {
    let draws;
    let trials;
    trials = rawExperiment.trials;
    draws = rawExperiment.draws;
    let frequency = {};
    let freqList = [];
    let label = [];

    // Chart 1: Actual Frequency Graph with repition
    for (let i = 0; i < parsedExperiment.w_replacement.length; i++){
        let totalNum = parsedExperiment.w_replacement[i].totalValue;
        frequency[totalNum] = frequency[totalNum] ? frequency[totalNum] + 1 : 1;
    }
    

    for (let i = draws; i <= draws * 13 ; i++) {
        label.push(i);
        if (frequency[i] == null) {
            freqList.push(0);
        } else {
            freqList.push(frequency[i]);
        }
    }

    for (let i = 0; i < freqList.length; i++){
        freqList[i] = freqList[i] / trials;
    }

    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [freqList]
    };

    let g1 = new Chartist.Bar('#prob-w-rep', data);
}

function createG2 () {
    let draws;
    let trials;
    trials = rawExperiment.trials;
    draws = rawExperiment.draws;
    let frequency = {};
    let freqList = [];
    let label = [];

    // Chart 1: Actual Frequency Graph with repition
    for (let i = 0; i < parsedExperiment.wo_replacement.length; i++){
        let totalNum = parsedExperiment.wo_replacement[i].totalValue;
        frequency[totalNum] = frequency[totalNum] ? frequency[totalNum] + 1 : 1;
    }

    for (let i = draws; i <= draws * 13 ; i++) {
        label.push(i);
        if (frequency[i] == null) {
            freqList.push(0);
        } else {
            freqList.push(frequency[i]);
        }
    }

    for (let i = 0; i < freqList.length; i++){
        freqList[i] = freqList[i] / trials;
    }

    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [freqList]
    };

    let g1 = new Chartist.Bar('#prob-wo-rep', data);
}

$(document).ready(function () {
    createG1();
    createG2();
});