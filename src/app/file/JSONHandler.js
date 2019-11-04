const fs = require('fs');
const path = require('path');

const DEFAULT_FILE_NAME = '../../../public/test.json';
const DEFAULT_FILE_PATH = path.join(__dirname, DEFAULT_FILE_NAME);

// fs is Node-specific; calling this code on the client will not work.
// Thus, we'll call it from ipcMain instead.
const loadJSONFromFile = (filePath = DEFAULT_FILE_PATH) => {
  const bufferedData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(bufferedData);
}

const saveJSONToFile = (content, filePath = DEFAULT_FILE_PATH) => {
  // TODO
}

module.exports = {
  loadJSONFromFile,
  saveJSONToFile
}
