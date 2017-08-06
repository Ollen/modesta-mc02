const {ipcRenderer} = require('electron');

function startSimulation (N, n, d) {
    return ipcRenderer.sendSync('start-simulation', {trials: N, draws: n, desiredValue: d}); 
}

function readSimulation (location) {
    return ipcRenderer.sendSync('read-import', {location});
}

function getRaw () {
    return ipcRenderer.sendSync('getRaw', {});
}

function getParsed () {
    return ipcRenderer.sendSync('getParsed', {});
}
