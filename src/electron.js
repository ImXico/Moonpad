const { app, ipcMain, BrowserWindow } = require('electron');
const { MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT } = require('./data/defaultSettings');
const { TOGGLE_ALWAYS_ON_TOP, TOGGLE_ALWAYS_ON_TOP_RESPONSE } = require('./data/ipcActions');
const {
  initDatabaseWithDefaults,
  saveIsAlwaysOnTop,
  saveWindowDimensions,
  loadWindowSettings
} = require('./data/dbHandler');
const isDev = require('electron-is-dev');
const path = require('path');

// Initialize local database
initDatabaseWithDefaults();

let window = null;

function createWindow() {
  const windowSettings = loadWindowSettings();
  window = new BrowserWindow({
    width: windowSettings.width,
    minWidth: MIN_WINDOW_WIDTH,
    height: windowSettings.height,
    minHeight: MIN_WINDOW_HEIGHT,
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: windowSettings.isAlwaysOnTop,
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
  window.on('resize', () => {
    const newDimensions = window.getSize();
    const newWidth = newDimensions[0];
    const newHeight = newDimensions[1];
    saveWindowDimensions(newWidth, newHeight);
  });
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
ipcMain.on(TOGGLE_ALWAYS_ON_TOP, (event, __) => {
  const isNowAlwaysOnTop = !window.isAlwaysOnTop();
  window.setAlwaysOnTop(isNowAlwaysOnTop);
  saveIsAlwaysOnTop();
  event.sender.send(TOGGLE_ALWAYS_ON_TOP_RESPONSE, {
    message: isNowAlwaysOnTop
      ? 'Always on top on.'
      : 'Always on top off.'
  });
});
