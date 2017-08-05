const {ipcRenderer} = require('electron');

function startSimulation (N, n) {
    return ipcRenderer.sendSync('start-simulation', {trials: N, draws: n});
}

