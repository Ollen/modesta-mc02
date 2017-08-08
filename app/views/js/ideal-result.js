const stat = require('simple-statistics');

let rawExperiment = getRaw();
let parsedExperiment = getParsed();

let minWR = [1,2,3,4,5];
let minWOR = [1,2,3,4,6];
let maxWR = [13,26,39,52,65];
let maxWOR = [13,26,39,52,64];

function createG1 () {
    let draws  = rawExperiment.draws;

    let label = [];
    for (let i = 0; i <= maxWR[draws-1] ; i++) {
        label.push(i);
    }
    label = label.slice(draws);
    let idealProb_WR = getIdealProb_WR()[draws].map(Number);
    
    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [idealProb_WR]
    };

    let g1 = new Chartist.Bar('#prob-w-rep', data);

    // Create Table and get Expected Val
    let markup = '';
    for (let i = 0; i < label.length; i++){
        let rowData = `<tr><td>${label[i]}</td><td>${idealProb_WR[i]}</td></tr>`;
        markup = markup + rowData;
    }

    $('#wr_table tbody').append(markup);
    
    $('#mean_wr').text(stat.mean(idealProb_WR).toFixed(4));
    $('#median_wr').text(stat.median(idealProb_WR).toFixed(4));
    $('#mode_wr').text(stat.max(idealProb_WR).toFixed(4));
    $('#var_wr').text(stat.variance(idealProb_WR).toFixed(4));
    $('#sd_wr').text(stat.standardDeviation(idealProb_WR).toFixed(4));

}

function createG2 () {
    let draws  = rawExperiment.draws;
    let idealProb_WOR = getIdealProb_WOR()[draws].map(Number);

    let label = [];
    for (let i = 0; i <= maxWOR[draws-1] ; i++) {
        label.push(i);
    }

    label = label.slice(draws);

    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [idealProb_WOR]
    };

    let g2 = new Chartist.Bar('#prob-wo-rep', data);

    // Create Table
    let markup = '';
    for (let i = 0; i < label.length; i++){
        let rowData = `<tr><td>${label[i]}</td><td>${idealProb_WOR[i]}</td></tr>`;
        markup = markup + rowData;
    }
    $('#wor_table tbody').append(markup);

    $('#mean_wor').text(stat.mean(idealProb_WOR).toFixed(4));
    $('#median_wor').text(stat.median(idealProb_WOR).toFixed(4));
    $('#mode_wor').text(stat.max(idealProb_WOR).toFixed(4));
    $('#var_wor').text(stat.variance(idealProb_WOR).toFixed(4));
    $('#sd_wor').text(stat.standardDeviation(idealProb_WOR).toFixed(4));
}

$(document).ready(function () {
    createG1();
    createG2();
});