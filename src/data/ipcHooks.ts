import { ipcMain } from "electron";
import {
  createTab,
  deleteTab,
  loadPersistedState,
  saveCurrentlySelectedTab,
  saveIsDarkTheme,
  saveIsTabAreaOpen,
  swapTabs,
  updateTabContent,
  updateTabName,
} from "./dbHandler";
import { IpcActions } from "./ipcActions";

// On-Load

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
