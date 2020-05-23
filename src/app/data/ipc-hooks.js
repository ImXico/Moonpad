const { ipcMain } = require('electron');
const ipcActions = require('./ipc-actions');
const dbActions = require('./db-handler');

ipcMain.on(ipcActions.LOAD_ALL_TABS, (event) => {
  const allTabs = dbActions.loadAllTabs();
  event.sender.send(ipcActions.TABS_REFRESHED, allTabs);
});

ipcMain.on(ipcActions.CREATE_TAB, (_, payload) => {
  const { index, name } = payload;
  dbActions.createNewTab(index, name);
});

ipcMain.on(ipcActions.UPDATE_TAB_NAME, (_, payload) => {
  const { oldName, newName } = payload;
  dbActions.updateTabName(oldName, newName);
});

ipcMain.on(ipcActions.SWAP_TABS_INDICES, (_, payload) => {
  const { index1, index2 } = payload;
  dbActions.swapTabsIndices(index1, index2);
});

ipcMain.on(ipcActions.UPDATE_TAB_CONTENT, (_, payload) => {
  const { name, newContent } = payload;
  dbActions.updateTabContent(name, newContent);
});

ipcMain.on(ipcActions.DELETE_TAB, (_, payload) => {
  const { name } = payload;
  dbActions.deleteTab(name);
})
