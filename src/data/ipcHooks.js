const { ipcMain } = require('electron');
const ipcActions = require('./ipcActions');
const dbActions = require('./dbHandler');

// Tabs

ipcMain.once(ipcActions.LOAD_PERSISTED_DATA, (event, _) => {
  const persistedState = dbActions.loadPersistedState();
  event.returnValue = persistedState;
});

ipcMain.on(ipcActions.CREATE_TAB, (_, payload) => {
  const { id, index, name } = payload;
  dbActions.createTab(id, index, name);
});

ipcMain.on(ipcActions.UPDATE_TAB_NAME, (_, payload) => {
  const { id, newName } = payload;
  dbActions.updateTabName(id, newName);
});

ipcMain.on(ipcActions.UPDATE_TAB_CONTENT, (_, payload) => {
  const { id, newContent } = payload;
  dbActions.updateTabContent(id, newContent);
});

ipcMain.on(ipcActions.SWAP_TABS, (_, payload) => {
  const { id, isMovingUp } = payload;
  dbActions.swapTabs(id, isMovingUp);
});

ipcMain.on(ipcActions.DELETE_TAB, (_, payload) => {
  const { id } = payload;
  dbActions.deleteTab(id);
})

// Tab Area Open

ipcMain.on(ipcActions.TOGGLE_OPEN_TAB_AREA, (_, __) => {
  dbActions.saveIsTabAreaOpen();
})

// Select Tab

ipcMain.on(ipcActions.SELECT_TAB, (_, payload) => {
  const { tabId } = payload;
  dbActions.saveCurrentlySelectedTab(tabId);
});

// Color Theme

ipcMain.on(ipcActions.TOGGLE_COLOR_THEME, (_, __) => {
  dbActions.saveIsDarkTheme();
});
