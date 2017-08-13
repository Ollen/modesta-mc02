const stat = require('simple-statistics');

let nbinomIdeal = getBinom().nbinom_ideal;
let nbinomActual = getBinom().nbinom_actual;

let trials = getRaw().trials;
let desiredProb = getRaw().desiredProb_wr[1];

let rnbinom_data;
let rnbinom_ideal;

function createActualBinomFreq() {
    let data  = {
        labels: nbinomActual[0],
        series: [nbinomActual[1]]
    };

    new Chartist.Bar('#actual-binom-freq', data, {
        axisX: {
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % (trials * .05) === 0 ? value: null;
            }
        }
    });

}

function createActualBinomProb(){
    let data  = {
        labels: nbinomActual[0],
        series: [nbinomActual[2]]
    };

    new Chartist.Line('#actual-binom-prob', data, {
        showArea: true,
        axisX: {
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % (trials * .05) === 0 ? value: null;
            }
        },
        showPoint: false
    });
}

function createIdealBinomProb(){
    let minTrunc = nbinomActual[0][0];
    let maxTrunc = nbinomActual[0][nbinomActual[0].length - 1];
    let data  = {
        labels: nbinomIdeal[0].slice(Number(minTrunc), Number(maxTrunc) + 1),
        series: [nbinomIdeal[1].slice(Number(minTrunc), Number(maxTrunc) + 1)]
    };

    new Chartist.Line('#ideal-binom-prob', data, {
        showArea: true,
        axisX: {
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % (trials * .05) === 0 ? value: null;
            }
        },
        showPoint: false
    });
}

function createStats() {
    $('#actual-binom-mean').text(stat.mean(nbinomActual[3]).toFixed(2));
    $('#actual-binom-median').text(stat.median(nbinomActual[3]).toFixed(2));
    $('#actual-binom-mode').text(stat.mode(nbinomActual[3]));
    $('#actual-binom-var').text(stat.variance(nbinomActual[3]).toFixed(4));
    $('#actual-binom-sd').text(stat.standardDeviation(nbinomActual[3]).toFixed(4));
    
}

function createTables() {
    let freq = '';
    let prob = '';
    for (let i = 0; i < nbinomActual[0].length; i ++) {
        let rowData = `<tr><td>${nbinomActual[0][i]}</td><td>${nbinomActual[1][i]}</td></tr>`;
        freq = freq + rowData;
        rowData = `<tr><td>${nbinomActual[0][i]}</td><td>${nbinomActual[2][i]}</td></tr>`;
        prob = prob + rowData;
    }
    $('#frequency_table tbody').append(freq);
    $('#probability_table tbody').append(prob);

    let minTrunc = nbinomActual[0][0];
    let maxTrunc = nbinomActual[0][nbinomActual[0].length - 1];
    let label = nbinomIdeal[0].slice(Number(minTrunc), Number(maxTrunc) + 1);
    let series = nbinomIdeal[1].slice(Number(minTrunc), Number(maxTrunc) + 1);

    let ideal = '';
    for(let i = 0; i < label.length; i++) {
        let rowData = `<tr><td>${label[i]}</td><td>${series[i]}</td></tr>`;
        ideal = ideal + rowData;
    }
    $('#ideal_table tbody').append(ideal);

}

function createFunction(N, p, s=1) {
    let code = `rnbinom(${N}, ${p}, ${s})`;

    $('.r-function code').text(code);
}

$('.desired-value').text(getRaw().desiredValue);


createFunction(trials, desiredProb.toFixed(4));
createStats();

createActualBinomFreq();
createActualBinomProb();
createIdealBinomProb();

createTables();

$('#function-btn').click(() => {
    let N = Number($('#trials').val());
    let s = Number($('#success').val());
    let p = desiredProb;

    createFunction(N, p.toFixed(4), s);

    rnbinom_data = getRnbinom_actual(N,p,s);
    rnbinom_ideal = getRnbinom_ideal(N,p,s);

    // Change Frequency Actual
    let data  = {
        labels: rnbinom_data[0],
        series: [rnbinom_data[1]]
    };

    new Chartist.Bar('#actual-binom-freq', data, {
        axisX: {
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % (trials * .05) === 0 ? value: null;
            }
        }
    });

    // Change Probability Actual
    data  = {
        labels: rnbinom_data[0],
        series: [rnbinom_data[2]]
    };

    new Chartist.Line('#actual-binom-prob', data, {
        showArea: true,
        axisX: {
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % (trials * .05) === 0 ? value: null;
            }
        },
        showPoint: false
    });

    // Change Ideal Chart
    let minTrunc = rnbinom_data[0][0];
    let maxTrunc = rnbinom_data[0][rnbinom_data[0].length - 1];
    data  = {
        labels: rnbinom_ideal[0].slice(Number(minTrunc), Number(maxTrunc) + 1),
        series: [rnbinom_ideal[1].slice(Number(minTrunc), Number(maxTrunc) + 1)]
    };

    new Chartist.Line('#ideal-binom-prob', data, {
        showArea: true,
        axisX: {
            labelInterpolationFnc: function skipLabels(value, index) {
                return index % (trials * .05) === 0 ? value: null;
            }
        },
        showPoint: false
    });





    let freq = '';
    let prob = '';
    
    $('#frequency_table tbody').empty();
    $('#probability_table tbody').empty();
    $('#ideal_table tbody').empty();


    for (let i = 0; i < rnbinom_data[0].length; i ++) {
        let rowData = `<tr><td>${rnbinom_data[0][i]}</td><td>${rnbinom_data[1][i]}</td></tr>`;
        freq = freq + rowData;
        rowData = `<tr><td>${rnbinom_data[0][i]}</td><td>${rnbinom_data[2][i]}</td></tr>`;
        prob = prob + rowData;
    }
    $('#frequency_table tbody').append(freq);
    $('#probability_table tbody').append(prob);

    minTrunc = rnbinom_data[0][0];
    maxTrunc = rnbinom_data[0][rnbinom_data[0].length - 1];
    let label = rnbinom_ideal[0].slice(Number(minTrunc), Number(maxTrunc) + 1);
    let series = rnbinom_ideal[1].slice(Number(minTrunc), Number(maxTrunc) + 1);

    let ideal = '';
    for(let i = 0; i < label.length; i++) {
        let rowData = `<tr><td>${label[i]}</td><td>${series[i]}</td></tr>`;
        ideal = ideal + rowData;
    }
    $('#ideal_table tbody').append(ideal);
    
});