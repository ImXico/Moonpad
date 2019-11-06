const fs = require('fs');

const NO_CONTENT = "";
const DEFAULT_FILE_PATH = '/Users/franciscocunha/Pictures/test.json';

const loadAllTabsNames = (filePath = DEFAULT_FILE_PATH) => {
  const bufferedData = fs.readFileSync(filePath, 'utf8');
  const fullDataObject = JSON.parse(bufferedData);
  return Object.keys(fullDataObject);
}

const loadAllTabsContent = (filePath = DEFAULT_FILE_PATH) => {
  const bufferedData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(bufferedData);
}

const loadTabContent = (tabName, filePath = DEFAULT_FILE_PATH) => {
  return loadAllTabsContent(filePath)[tabName];
}

const updateTabContent = (tabName, newContent, filePath = DEFAULT_FILE_PATH) => {
  const oldFullData = loadAllTabsContent();
  const updatedObject = { ...oldFullData, [tabName]: newContent };
  fs.writeFile(filePath, JSON.stringify(updatedObject, null, 2), error => {
    if (error) throw error;
  });
}

const createNewTab = (tabName, filePath = DEFAULT_FILE_PATH) => {
  updateTabContent(tabName, NO_CONTENT, filePath);
}

module.exports = {
  loadAllTabsContent,
  loadAllTabsNames,
  loadTabContent,
  updateTabContent,
  createNewTab
}
