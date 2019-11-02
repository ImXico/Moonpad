const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 500,
    //frame: false,
    //resizable: false,
  });

  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`);

  app.setAboutPanelOptions({
    applicationName: 'typr',
    applicationVersion: '0.0.1',
  });

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
