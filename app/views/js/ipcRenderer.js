const {ipcRenderer} = require('electron');

export const startSimulation = (N, n) => {
    return ipcRenderer.sendSync('start-simulation', {trials: N, draws: n});
};