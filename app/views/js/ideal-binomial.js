const stat = require('simple-statistics');

let binomIdeal = getBinom().binom_ideal;
let binomActual = getBinom().binom_actual;

let trials = getRaw().trials;
let desiredProb = getRaw().desiredProb_wor[1];

function createActualBinomFreq() {
    let data  = {
        labels: binomActual[0],
        series: [binomActual[1]]
    };

    new Chartist.Bar('#actual-binom-freq', data);

}

function createActualBinomProb(){
    let data  = {
        labels: binomActual[0],
        series: [binomActual[2]]
    };

    new Chartist.Line('#actual-binom-prob', data, {
        showArea: true
    });
}

function createIdealBinomProb(){
    let minTrunc = binomActual[0][0];
    let maxTrunc = binomActual[0][binomActual[0].length - 1];
    let data  = {
        labels: binomIdeal[0].slice(Number(minTrunc), Number(maxTrunc) + 1),
        series: [binomIdeal[1].slice(Number(minTrunc), Number(maxTrunc) + 1)]
    };

    new Chartist.Line('#ideal-binom-prob', data, {
        showArea: true
    });
}

function createStats() {
    $('#actual-binom-mean').text(stat.mean(binomActual[3]).toFixed(2));
    $('#actual-binom-median').text(stat.median(binomActual[3]).toFixed(2));
    $('#actual-binom-mode').text(stat.mode(binomActual[3]));
    $('#actual-binom-var').text(stat.variance(binomActual[3]).toFixed(4));
    $('#actual-binom-sd').text(stat.standardDeviation(binomActual[3]).toFixed(4));
    
}

function createTables() {
    let freq = '';
    let prob = '';
    for (let i = 0; i < binomActual[0].length; i ++) {
        let rowData = `<tr><td>${binomActual[0][i]}</td><td>${binomActual[1][i]}</td></tr>`;
        freq = freq + rowData;
        rowData = `<tr><td>${binomActual[0][i]}</td><td>${binomActual[2][i]}</td></tr>`;
        prob = prob + rowData;
    }
    $('#frequency_table tbody').append(freq);
    $('#probability_table tbody').append(prob);

    let minTrunc = binomActual[0][0];
    let maxTrunc = binomActual[0][binomActual[0].length - 1];
    let label = binomIdeal[0].slice(Number(minTrunc), Number(maxTrunc) + 1);
    let series = binomIdeal[1].slice(Number(minTrunc), Number(maxTrunc) + 1);

    let ideal = '';
    for(let i = 0; i < label.length; i++) {
        let rowData = `<tr><td>${label[i]}</td><td>${series[i]}</td></tr>`;
        ideal = ideal + rowData;
    }
    $('#ideal_table tbody').append(ideal);

}
$('.desired-value').text(getRaw().desiredValue);


$('.r-function code').text(`rbinom(${trials}, ${trials}, ${desiredProb.toFixed(4)})`);

createStats();
createActualBinomFreq();
createActualBinomProb();
createIdealBinomProb();

createTables();