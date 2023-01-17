const { app, ipcMain, BrowserWindow } = require("electron");

const isDev = require("electron-is-dev");
const path = require("path");
const {
  MIN_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
} = require("./data/defaultSettings");

const {
  TOGGLE_ALWAYS_ON_TOP,
  TOGGLE_ALWAYS_ON_TOP_RESPONSE,
  MINIMIZE_WINDOW,
  TOGGLE_MAXIMIZE_WINDOW,
  CLOSE_WINDOW,
} = require("./data/ipcActions");

const {
  setupDatabaseSource,
  initDatabaseWithDefaults,
  saveWindowDimensions,
  loadWindowSettings,
  saveIsAlwaysOnTop,
} = require("./data/dbHandler");

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
    titleBarStyle: "hiddenInset",
    frame: false,
    backgroundColor: "#2E3440",
  });

  window.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  window.on("closed", () => {
    window = null;
  });

  window.on("resize", () => {
    const newDimensions = window.getSize();
    const [newWidth, newHeight] = newDimensions;
    saveWindowDimensions(newWidth, newHeight);
  });
}

app.on("ready", () => {
  setupDatabaseSource();
  initDatabaseWithDefaults();
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (window === null) {
    createWindow();
  }
});

// Setup IPC hooks
require("./data/ipcHooks");

// Extra IPC hooks that manipulate the window itself

// Could not figure out how to access this 'window' reference
// in Node (where all the other ipcMain hooks are defined),
// so it'll just stay here...
ipcMain.on(TOGGLE_ALWAYS_ON_TOP, (event) => {
  const isNowAlwaysOnTop = !window.isAlwaysOnTop();
  window.setAlwaysOnTop(isNowAlwaysOnTop);
  saveIsAlwaysOnTop();
  event.sender.send(TOGGLE_ALWAYS_ON_TOP_RESPONSE, {
    message: isNowAlwaysOnTop ? "Always on top on." : "Always on top off.",
  });
});

// Window Controls (Non-MacOS only)

ipcMain.on(MINIMIZE_WINDOW, () => {
  window.minimize();
});

ipcMain.on(TOGGLE_MAXIMIZE_WINDOW, () => {
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
});

ipcMain.on(CLOSE_WINDOW, () => {
  window.close();
});
