const { ipcMain } = require('electron');
const { loadJSONFromFile } = require('./app/file/JSONHandler');

const LOAD_TABS_AND_TABS_CONTENT = 'Load-Tabs-And-Content';
const DATA_RETRIEVED = 'Data-Retrieved';

ipcMain.on(LOAD_TABS_AND_TABS_CONTENT, (event) => {
  const dataObject = loadJSONFromFile();
  event.sender.send(DATA_RETRIEVED, dataObject);
});

module.exports = {
  LOAD_TABS_AND_TABS_CONTENT,
  DATA_RETRIEVED
}