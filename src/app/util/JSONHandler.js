const fs = require('fs');

// TODO: This way of managing tabs and content is very bad, needs to be redone
// Some actions don't here (and on IPC/IPC Constants) don't make sense anymore
// Should also take this opportunity to introduce order indices on the entries

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

const updateTabName = (oldTabName, newTabName) => {
  // const oldFullData = loadAllTabsContent();
  // const tabContent = oldFullData[oldTabName];
  // delete oldFullData[oldTabName];
  // createNewTab(newTabName, tabContent);
  // fs.writeFile(DEFAULT_FILE_PATH, JSON.stringify(updatedObject, null, 2), error => {
  //   if (error) throw error;
  // });
}

const updateTabContent = (tabName, newContent, filePath = DEFAULT_FILE_PATH) => {
  const oldFullData = loadAllTabsContent();
  const updatedObject = { ...oldFullData, [tabName]: newContent };
  fs.writeFile(filePath, JSON.stringify(updatedObject, null, 2), error => {
    if (error) throw error;
  });
}

const createNewTab = (tabName, tabContent = NO_CONTENT, filePath = DEFAULT_FILE_PATH) => {
  updateTabContent(tabName, tabContent, filePath);
}

module.exports = {
  loadAllTabsContent,
  loadAllTabsNames,
  loadTabContent,
  updateTabName,
  updateTabContent,
  createNewTab
}
