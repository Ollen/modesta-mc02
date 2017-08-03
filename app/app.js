const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment');
const log = require('./modules/logResult');

let rawRes = drawCard(3, 5);
let parsedRes = parseExperiment(rawRes);

log.raw(rawRes);
log.parsed(parsedRes);
