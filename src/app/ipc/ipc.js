const { ipcMain } = require('electron');
const ipcConstants = require('./constants');
const {
  loadAllTabsNames,
  loadAllTabsContent,
  loadTabContent,
  updateTabContent,
  createNewTab
} = require('../util/JSONHandler');

ipcMain.on(ipcConstants.LOAD_ALL_TABS_CONTENT, (event) => {
  const allContent = loadAllTabsContent();
  event.sender.send(ipcConstants.ALL_TABS_CONTENT_RETRIEVED, allContent);
});

ipcMain.on(ipcConstants.LOAD_ALL_TABS_NAMES, (event) => {
  const allNames = loadAllTabsNames();
  event.sender.send(ipcConstants.ALL_TABS_NAMES_RETRIEVED, allNames);
});

ipcMain.on(ipcConstants.LOAD_TAB_CONTENT, (event, tabName) => {
  const tabContent = loadTabContent(tabName);
  event.sender.send(ipcConstants.TAB_CONTENT_RETRIEVED, {
    tabName, tabContent
  });
});

ipcMain.on(ipcConstants.UPDATE_TAB_CONTENT, (_, data) => {
  const { nameOfTabToBeUpdated, updatedContent } = data;
  updateTabContent(nameOfTabToBeUpdated, updatedContent);
});

ipcMain.on(ipcConstants.CREATE_NEW_TAB, (_, tabName) => {
  createNewTab(tabName);
})
