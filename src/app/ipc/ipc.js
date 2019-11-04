const { ipcMain } = require('electron');
const { loadJSONFromFile } = require('../file/JSONHandler');
const ipcConstants = require('./constants');

ipcMain.on(ipcConstants.LOAD_TABS_AND_TABS_CONTENT, (event) => {
  const dataObject = loadJSONFromFile();
  event.sender.send(ipcConstants.DATA_RETRIEVED, dataObject);
});
