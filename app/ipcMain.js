const {ipcMain} = require('electron');

const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment.js');
const log = require('./modules/log');

ipcMain.on('start-simulation', (event, arg) => {
    let rawExperiment = drawCard(arg.trials, arg.draws);
    let parsedExperiment = parseExperiment(rawExperiment);

    // Log
    log.writeParsed(parsedExperiment);
    log.writeRaw(rawExperiment);
    
    global.sharedObject = {
        rawExperiment,
        parsedExperiment
    };
    event.returnValue = [rawExperiment, parsedExperiment];
});

module.exports = ipcMain;
