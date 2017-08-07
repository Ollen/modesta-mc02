const fs = require('fs');

let idealProb_WR;
let idealProb_WOR;

idealProb_WOR = JSON.parse(fs.readFileSync('app/modules/ideal-prob/idealWOR.json'));

idealProb_WR = JSON.parse(fs.readFileSync('app/modules/ideal-prob/idealWR.json'));


module.exports = {
    idealProb_WOR,
    idealProb_WR
};