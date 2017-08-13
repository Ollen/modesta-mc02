const stat = require('simple-statistics');

let rhyperIdeal = getBinom().rhyper_ideal;
let rhyperActual = getBinom().rhyper_actual;

let trials = getRaw().trials;
let desiredProb = getRaw().desiredProb_wor[1];

let m = getRaw().desiredProb_wor[0]
let n = combinationTotalList[getRaw().draws];

let rhyper_data;
let rhyper_ideal;

function createActualBinomFreq() {
    let data  = {
        labels: rhyperActual[0],
        series: [rhyperActual[1]]
    };

    new Chartist.Bar('#actual-binom-freq', data, {
    });

}

function createActualBinomProb(){
    let data  = {
        labels: rhyperActual[0],
        series: [rhyperActual[2]]
    };

    new Chartist.Line('#actual-binom-prob', data, {
        showArea: true
    });
}

function createIdealBinomProb(){
    let minTrunc = rhyperActual[0][0];
    let maxTrunc = rhyperActual[0][rhyperActual[0].length - 1];
    let data  = {
        labels: rhyperIdeal[0].slice(Number(minTrunc), Number(maxTrunc) + 1),
        series: [rhyperIdeal[1].slice(Number(minTrunc), Number(maxTrunc) + 1)]
    };

    new Chartist.Line('#ideal-binom-prob', data, {
        showArea: true
    });
}

function createStats() {
    $('#actual-binom-mean').text(stat.mean(rhyperActual[3]).toFixed(2));
    $('#actual-binom-median').text(stat.median(rhyperActual[3]).toFixed(2));
    $('#actual-binom-mode').text(stat.mode(rhyperActual[3]));
    $('#actual-binom-var').text(stat.variance(rhyperActual[3]).toFixed(4));
    $('#actual-binom-sd').text(stat.standardDeviation(rhyperActual[3]).toFixed(4));
    
}

function createTables() {
    let freq = '';
    let prob = '';
    for (let i = 0; i < rhyperActual[0].length; i ++) {
        let rowData = `<tr><td>${rhyperActual[0][i]}</td><td>${rhyperActual[1][i]}</td></tr>`;
        freq = freq + rowData;
        rowData = `<tr><td>${rhyperActual[0][i]}</td><td>${rhyperActual[2][i]}</td></tr>`;
        prob = prob + rowData;
    }
    $('#frequency_table tbody').append(freq);
    $('#probability_table tbody').append(prob);

    let minTrunc = rhyperActual[0][0];
    let maxTrunc = rhyperActual[0][rhyperActual[0].length - 1];
    let label = rhyperIdeal[0].slice(Number(minTrunc), Number(maxTrunc) + 1);
    let series = rhyperIdeal[1].slice(Number(minTrunc), Number(maxTrunc) + 1);

    let ideal = '';
    for(let i = 0; i < label.length; i++) {
        let rowData = `<tr><td>${label[i]}</td><td>${series[i]}</td></tr>`;
        ideal = ideal + rowData;
    }
    $('#ideal_table tbody').append(ideal);

}

function createFunction(nn=50, k=50) {
    let code = `rhyper(${nn}, ${m}, ${n}, ${k})`;

    $('.r-function code').text(code);
}

$('.desired-value').text(getRaw().desiredValue);


createFunction();
createStats();

createActualBinomFreq();
createActualBinomProb();
createIdealBinomProb();

createTables();

$('#function-btn').click(() => {
    let nn = Number($('#observation').val());
    let k = Number($('#trials').val());
    let p = desiredProb;

    createFunction(nn, k);

    rhyper_data = getRhyper_actual(nn, m, n, k);
    rhyper_ideal = getRhyper_ideal(k, m, n);

    // Change Frequency Actual
    let data  = {
        labels: rhyper_data[0],
        series: [rhyper_data[1]]
    };

    new Chartist.Bar('#actual-binom-freq', data, {
    });

    // Change Probability Actual
    data  = {
        labels: rhyper_data[0],
        series: [rhyper_data[2]]
    };

    new Chartist.Line('#actual-binom-prob', data, {
        showArea: true
    });

    // Change Ideal Chart
    let minTrunc = rhyper_data[0][0];
    let maxTrunc = rhyper_data[0][rhyper_data[0].length - 1];
    data  = {
        labels: rhyper_ideal[0].slice(Number(minTrunc), Number(maxTrunc) + 1),
        series: [rhyper_ideal[1].slice(Number(minTrunc), Number(maxTrunc) + 1)]
    };

    new Chartist.Line('#ideal-binom-prob', data, {
        showArea: true
    });





    let freq = '';
    let prob = '';
    
    $('#frequency_table tbody').empty();
    $('#probability_table tbody').empty();
    $('#ideal_table tbody').empty();


    for (let i = 0; i < rhyper_data[0].length; i ++) {
        let rowData = `<tr><td>${rhyper_data[0][i]}</td><td>${rhyper_data[1][i]}</td></tr>`;
        freq = freq + rowData;
        rowData = `<tr><td>${rhyper_data[0][i]}</td><td>${rhyper_data[2][i]}</td></tr>`;
        prob = prob + rowData;
    }
    $('#frequency_table tbody').append(freq);
    $('#probability_table tbody').append(prob);

    minTrunc = rhyper_data[0][0];
    maxTrunc = rhyper_data[0][rhyper_data[0].length - 1];
    let label = rhyper_ideal[0].slice(Number(minTrunc), Number(maxTrunc) + 1);
    let series = rhyper_ideal[1].slice(Number(minTrunc), Number(maxTrunc) + 1);

    let ideal = '';
    for(let i = 0; i < label.length; i++) {
        let rowData = `<tr><td>${label[i]}</td><td>${series[i]}</td></tr>`;
        ideal = ideal + rowData;
    }
    $('#ideal_table tbody').append(ideal);
    
});