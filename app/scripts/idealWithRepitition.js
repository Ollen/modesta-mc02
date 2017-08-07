const R = require('r-script');
const fs = require('fs');

const generate = () => {

    let idealResult = {};

    for (let i = 1; i <= 5; i++) {
        idealResult[i] = R('./p.sum.list.R')
                            .data(i)
                            .callSync();
    }

    let rawJSON = JSON.stringify(idealResult, null, 2);
    fs.writeFile('idealProbabilityResult.json', rawJSON, err => {
        if (err) throw err;
        console.log('Logged raw simulation');
    });
};

generate();