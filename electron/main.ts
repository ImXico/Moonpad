import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import {
  createTab,
  deleteTab,
  initDatabaseWithDefaults,
  loadPersistedState,
  loadWindowSettings,
  saveCurrentlySelectedTab,
  saveIsAlwaysOnTop,
  saveIsDarkTheme,
  saveIsTabAreaOpen,
  saveWindowDimensions,
  setupDatabaseSource,
  swapTabs,
  updateTabContent,
  updateTabName,
} from "../src/data/dbHandler";
import {
  DEFAULT_MIN_WINDOW_HEIGHT,
  DEFAULT_MIN_WINDOW_WIDTH,
} from "../src/data/defaultSettings";
import { IpcActions } from "../src/data/ipcActions";

let window: BrowserWindow | null = null;

function createWindow() {
  const windowSettings = loadWindowSettings();
  if (!windowSettings) {
    // TODO
    throw new Error();
  }

  window = new BrowserWindow({
    width: windowSettings.width,
    minWidth: DEFAULT_MIN_WINDOW_WIDTH,
    height: windowSettings.height,
    minHeight: DEFAULT_MIN_WINDOW_HEIGHT,
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: windowSettings.isAlwaysOnTop,
    titleBarStyle: "hiddenInset",
    frame: false,
    backgroundColor: "#2E3440",
  });

  window.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "../build/index.html")}`
      : "http://localhost:3000/index.html"
  );

  window.on("closed", () => {
    window = null;
  });

  window.on("resize", () => {
    if (window) {
      const newDimensions = window.getSize();
      const [newWidth, newHeight] = newDimensions;
      saveWindowDimensions(newWidth, newHeight);
    }
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

// Register IPC listeners on the Main Process first...

ipcMain.once(IpcActions.LoadPersistedData, (event) => {
  const persistedState = loadPersistedState();
  // eslint-disable-next-line no-param-reassign
  event.returnValue = persistedState;
});

ipcMain.once(IpcActions.CheckIfMacOs, (event) => {
  const isMacOS = process.platform === "darwin";
  // eslint-disable-next-line no-param-reassign
  event.returnValue = isMacOS;
});

// Tabs

ipcMain.on(IpcActions.CreateTab, (_, payload) => {
  const { id, index, name } = payload;
  createTab(id, index, name);
});

ipcMain.on(IpcActions.UpdateTabName, (_, payload) => {
  const { id, newName } = payload;
  updateTabName(id, newName);
});

ipcMain.on(IpcActions.UpdateTabContent, (_, payload) => {
  const { id, newContent } = payload;
  updateTabContent(id, newContent);
});

ipcMain.on(IpcActions.SwapTabs, (_, payload) => {
  const { id, isMovingUp } = payload;
  swapTabs(id, isMovingUp);
});

ipcMain.on(IpcActions.DeleteTab, (_, payload) => {
  const { id } = payload;
  deleteTab(id);
});

// Tab Area Open

ipcMain.on(IpcActions.ToggleOpenTabArea, () => {
  saveIsTabAreaOpen();
});

// Select Tab

ipcMain.on(IpcActions.SelectTab, (_, payload) => {
  const { tabId } = payload;
  saveCurrentlySelectedTab(tabId);
});

// Color Theme

ipcMain.on(IpcActions.ToggleColorTheme, () => {
  saveIsDarkTheme();
});

ipcMain.on(IpcActions.ToggleAlwaysOnTopRequest, (event) => {
  if (window) {
    const isNowAlwaysOnTop = !window.isAlwaysOnTop();
    window.setAlwaysOnTop(isNowAlwaysOnTop);
    saveIsAlwaysOnTop();

    event.sender.send(IpcActions.ToggleAlwaysOnTopResponse, {
      message: isNowAlwaysOnTop ? "Always on top on." : "Always on top off.",
    });
  }
});

// Window Controls (Non-MacOS only)

ipcMain.on(IpcActions.MinimizeWindow, () => {
  window?.minimize();
});

ipcMain.on(IpcActions.ToggleMaximizeWindow, () => {
  if (window) {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  }
});

ipcMain.on(IpcActions.CloseWindow, () => {
  window?.close();
});
