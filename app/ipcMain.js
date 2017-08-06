const {ipcMain} = require('electron');
const fs = require('fs');

const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment.js');
const getIdealProbability_WR = require('./modules/wr_getIdealProb');
const log = require('./modules/log');

ipcMain.on('start-simulation', (event, arg) => {
    
    let rawExperiment = drawCard(arg.trials, arg.draws);
    
    try {
        let desiredProb_wr = getIdealProbability_WR(arg.desiredValue, arg.draws);
        rawExperiment.desiredValue = arg.desiredValue;
        rawExperiment.desiredProb_wr = desiredProb_wr;

    } catch (err) {
        console.log(err);
        throw err;
    }
    
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

ipcMain.on('read-import', (event, arg) => {
    if (!fs.existsSync(arg.location)) {
        event.returnValue = false;
        return;
    }

    try {
        let rawJSON = fs.readFileSync(arg.location);
        let rawExperiment = JSON.parse(rawJSON);
        let parsedExperiment = parseExperiment(rawExperiment);


        log.writeParsed(parsedExperiment);
        log.writeRaw(rawExperiment);
    
        global.sharedObject = {
            rawExperiment,
            parsedExperiment
        };
    } catch (err) {
        console.log(err);
        event.returnValue = false;
        return;
    }

    event.returnValue = true;
});

ipcMain.on('getRaw', (event, arg) => {
    event.returnValue = global.sharedObject.rawExperiment;
});

ipcMain.on('getParsed', (event, arg) => {
    event.returnValue = global.sharedObject.parsedExperiment;
});

module.exports = ipcMain;
