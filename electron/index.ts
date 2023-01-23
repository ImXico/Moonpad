import { app, BrowserWindow } from "electron";
import * as path from "path";
import {
  initDatabaseWithDefaults,
  loadWindowSettings,
  saveWindowDimensions,
  setupDatabaseSource,
} from "./data/dbHandler";
import {
  DEFAULT_MIN_WINDOW_HEIGHT,
  DEFAULT_MIN_WINDOW_WIDTH,
} from "./data/defaultSettings";
import { registerMainProcessHooks } from "./data/mainProcessHooks";

let window: BrowserWindow | null = null;

function createWindow() {
  const windowSettings = loadWindowSettings();
  if (!windowSettings) {
    // TODO handle this error properly
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

  registerMainProcessHooks(window);
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
