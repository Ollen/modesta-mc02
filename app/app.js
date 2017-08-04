const electron = require('electron');
const app = electron.app;
require('./ipcMain');

let mainWindow;

function createWindow() {
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        title: 'Card Drawing Simulation',
        center: true,
        show: false
    });

    win.loadURL(`file://${__dirname}/views/test.html`);
    win.on('closed', onClosed);
    win.on('ready-to-show', () => {
        win.show();
    });

    return win;
}

function onClosed() {
    mainWindow = null;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createWindow();
    }
});

app.on('ready', () => {
    mainWindow = createWindow();
});
