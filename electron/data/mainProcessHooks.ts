import { BrowserWindow, ipcMain } from "electron";
import { IpcActions } from "../../src/shared/ipcActions";
import {
  createTab,
  deleteTab,
  loadPersistedState,
  saveCurrentlySelectedTab,
  saveIsAlwaysOnTop,
  saveIsDarkTheme,
  saveIsTabAreaOpen,
  swapTabs,
  updateTabContent,
  updateTabName,
} from "./dbHandler";

function registerLoadPersistedDataListener() {
  ipcMain.once(IpcActions.LoadPersistedData, (event) => {
    const persistedState = loadPersistedState();
    // eslint-disable-next-line no-param-reassign
    event.returnValue = persistedState;
  });
}

function registerCheckOperatingSystemListener() {
  ipcMain.once(IpcActions.CheckIfMacOs, (event) => {
    const isMacOS = process.platform === "darwin";
    // eslint-disable-next-line no-param-reassign
    event.returnValue = isMacOS;
  });
}

function registerCreateTabListener() {
  ipcMain.on(IpcActions.CreateTab, (_, payload) => {
    const { id, index, name } = payload;
    createTab(id, index, name);
  });
}

function registerUpdateTabNameListener() {
  ipcMain.on(IpcActions.UpdateTabName, (_, payload) => {
    const { id, newName } = payload;
    updateTabName(id, newName);
  });
}

function registerUpdateTabContentListener() {
  ipcMain.on(IpcActions.UpdateTabContent, (_, payload) => {
    const { id, newContent } = payload;
    updateTabContent(id, newContent);
  });
}

function registerSwapTabsListener() {
  ipcMain.on(IpcActions.SwapTabs, (_, payload) => {
    const { id, isMovingUp } = payload;
    swapTabs(id, isMovingUp);
  });
}

function registerDeleteTabListener() {
  ipcMain.on(IpcActions.DeleteTab, (_, payload) => {
    const { id } = payload;
    deleteTab(id);
  });
}

function registerSelectTabListener() {
  ipcMain.on(IpcActions.SelectTab, (_, payload) => {
    const { tabId } = payload;
    saveCurrentlySelectedTab(tabId);
  });
}

function registerToggleTabAreaOpenListener() {
  ipcMain.on(IpcActions.ToggleOpenTabArea, () => {
    saveIsTabAreaOpen();
  });
}

function registerToggleThemeListener() {
  ipcMain.on(IpcActions.ToggleColorTheme, () => {
    saveIsDarkTheme();
  });
}

function registerToggleAlwaysOnTopListener(window: BrowserWindow) {
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
}

function registerMinimizeWindowListener(window: BrowserWindow) {
  ipcMain.on(IpcActions.MinimizeWindow, () => {
    window?.minimize();
  });
}

function registerToggleMaximizeWindowListener(window: BrowserWindow) {
  ipcMain.on(IpcActions.ToggleMaximizeWindow, () => {
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
    }
  });
}

function registerCloseWindowListener(window: BrowserWindow) {
  ipcMain.on(IpcActions.CloseWindow, () => {
    window?.close();
  });
}

export function registerMainProcessHooks(window: BrowserWindow) {
  registerLoadPersistedDataListener();
  registerCheckOperatingSystemListener();
  registerCreateTabListener();
  registerUpdateTabNameListener();
  registerUpdateTabContentListener();
  registerSwapTabsListener();
  registerDeleteTabListener();
  registerSelectTabListener();
  registerToggleTabAreaOpenListener();
  registerToggleThemeListener();
  registerToggleAlwaysOnTopListener(window);
  registerMinimizeWindowListener(window);
  registerToggleMaximizeWindowListener(window);
  registerCloseWindowListener(window);
}
