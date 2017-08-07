const R = require('r-script');
const fs = require('fs');

const generate = () => {

    let idealResult = {};


    idealResult[5] = R('./p.sum.list.wor.R')
    .data(5)
    .callSync();

    let rawJSON = JSON.stringify(idealResult, null, 4);
    fs.writeFile('idealWORResult.json', rawJSON, err => {
        if (err) throw err;
        console.log('Logged raw simulation');
    });
};

generate();