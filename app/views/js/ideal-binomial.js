let binomIdeal = getBinom().binom_ideal;
let binomActual = getBinom().binom_actual;

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

createActualBinomFreq();
createActualBinomProb();
createIdealBinomProb();