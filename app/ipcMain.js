const {ipcMain} = require('electron');

const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment.js');
const log = require('./modules/log');

ipcMain.on('start-simulation', (event, arg) => {
    let rawResult = drawCard(arg.trials, arg.draws);
    let parsedResult = parseExperiment(rawResult);

    // Log
    log.writeParsed(parsedResult);
    log.writeRaw(rawResult);
    
    event.returnValue = [rawResult, parsedResult];
});

module.exports = ipcMain;
