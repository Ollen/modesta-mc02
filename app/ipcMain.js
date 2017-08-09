const {ipcMain} = require('electron');
const fs = require('fs');

const drawCard = require('./modules/drawCard');
const parseExperiment = require('./modules/parseExperiment.js');
const getIdealProbability_WR = require('./modules/wr_getIdealProb');
const getIdealProbability_WOR = require('./modules/wor_getIdealProb');
const getRbinom_100 = require('./modules/rbinom_100');
const getRhyper_100 = require('./modules/rhyper_100');
const getIdealProb = require('./modules/idealProb');

const {combinationTotalList} = require('./modules/perm-comb-list');
const log = require('./modules/log');

ipcMain.on('start-simulation', (event, arg) => {
    
    let rawExperiment = drawCard(arg.trials, arg.draws);
    
    try {
        let desiredProb_wr = Number(getIdealProb.idealProb_WR[arg.draws][arg.desiredValue - arg.draws]);
        desiredProb_wr = [(desiredProb_wr * Math.pow(52, arg.draws)).toFixed(0), desiredProb_wr];
        
        let wor_min = arg.draws != 5 ? arg.draws : 6;
        let desiredProb_wor = Number(getIdealProb.idealProb_WOR[arg.draws][arg.desiredValue - wor_min]);
        desiredProb_wor = [(desiredProb_wor * combinationTotalList[arg.draws]).toFixed(0), desiredProb_wor];


        rawExperiment.desiredValue = arg.desiredValue;

        rawExperiment.desiredProb_wr = desiredProb_wr;
        rawExperiment.desiredProb_wor = desiredProb_wor;
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
        parsedExperiment,
        desiredRBinom_100: getRbinom_100(arg.trials, parsedExperiment.desiredProb_wr[1]),
        desiredRHyper_100: getRhyper_100(arg.trials, parsedExperiment.desiredProb_wor[0], combinationTotalList[arg.draws] - parsedExperiment.desiredProb_wor[0])
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
            parsedExperiment,
            desiredRBinom_100: getRbinom_100(arg.trials, parsedExperiment.desiredProb_wr[1])
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

ipcMain.on('getRbinom_100', (event, arg) => {
    event.returnValue = global.sharedObject.desiredRBinom_100;
});

ipcMain.on('getRhyper_100', (event, arg) => {
    event.returnValue = global.sharedObject.desiredRHyper_100;
});

ipcMain.on('getIdealProb_WOR', (event, arg) => {
    event.returnValue = getIdealProb.idealProb_WOR;
});

ipcMain.on('getIdealProb_WR', (event, arg) => {
    event.returnValue = getIdealProb.idealProb_WR;
});

module.exports = ipcMain;
