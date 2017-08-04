const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment');
const log = require('./modules/log');

let rawRes = drawCard(3, 5);
let parsedRes = parseExperiment(rawRes);

log.writeRaw(rawRes);
log.writeParsed(parsedRes);

