const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment');

let rawRes = drawCard(3, 5);
let parsedRes = parseExperiment(rawRes);