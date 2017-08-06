const {ipcRenderer} = require('electron');

function startSimulation (N, n) {
    return ipcRenderer.sendSync('start-simulation', {trials: N, draws: n}); 
}

function readSimulation (location) {
    return ipcRenderer.sendSync('read-import', {location});
}

