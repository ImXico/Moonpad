const { app, ipcMain, BrowserWindow } = require('electron');
const { TOGGLE_ALWAYS_ON_TOP } = require('./data/ipcActions');
const {
  initDatabaseWithDefaults,
  saveIsAlwaysOnTop,
  loadWindowSettings
} = require('./data/dbHandler');
const isDev = require('electron-is-dev');
const path = require('path');

// Initialize local database
initDatabaseWithDefaults();

let window = null;

function createWindow() {
  const windowSettings = loadWindowSettings();
  console.log(windowSettings);
  window = new BrowserWindow({
    width: 770,
    height: 450,
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: windowSettings.wasAlwaysOnTop,
    titleBarStyle: 'hiddenInset',
    frame: false,
    backgroundColor: '#2E3440',
  });

  window.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`);

  app.setAboutPanelOptions({
    applicationName: 'typr',
    applicationVersion: '0.0.1',
  });

  window.on('closed', () => window = null);
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
  if (window === null) {
    createWindow();
  }
});

// Setup IPC hooks
require('./data/ipcHooks');

// Extra IPC hooks that manipulate the window itself
ipcMain.on(TOGGLE_ALWAYS_ON_TOP, (_, __) => {
  window.setAlwaysOnTop(!window.isAlwaysOnTop());
  saveIsAlwaysOnTop();
});
