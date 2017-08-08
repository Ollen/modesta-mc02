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

    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [freqList]
    };

    let g1 = new Chartist.Bar('#freq-w-rep', data);

    // Create Table
    let markup = '';
    for (let i = 0; i < label.length; i++){
        let rowData = `<tr><td>${label[i]}</td><td>${freqList[i]}</td></tr>`;
        markup = markup + rowData;
    }
    $('#wr_table tbody').append(markup);
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

    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [freqList]
    };

    let g1 = new Chartist.Bar('#freq-wo-rep', data);

    // Create Table
    let markup = '';
    for (let i = 0; i < label.length; i++){
        let rowData = `<tr><td>${label[i]}</td><td>${freqList[i]}</td></tr>`;
        markup = markup + rowData;
    }
    $('#wor_table tbody').append(markup);
}

$(document).ready(function () {
    createG1();
    createG2();
});