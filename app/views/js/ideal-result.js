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
}

function createG2 () {
    let draws  = rawExperiment.draws;

    let label = [];
    for (let i = 0; i <= maxWOR[draws-1] ; i++) {
        label.push(i);
    }
    label = label.slice(draws);
    let idealProb_WOR = getIdealProb_WOR()[draws].map(Number);

    let data = {
        // A labels array that can contain any sort of values
        labels: label,
        // Our series array that contains series objects or in this case series data arrays
        series: [idealProb_WOR]
    };

    let g2 = new Chartist.Bar('#prob-wo-rep', data);

}

$(document).ready(function () {
    createG1();
    createG2();
});