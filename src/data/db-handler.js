const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const DATABASE_FILE_NAME = 'db.json';
const adapter = new FileSync(DATABASE_FILE_NAME);
const db = low(adapter);

/**
 * Defines the schema and initialize the local JSON database with the default values.
 * This is necessary on first use, where the db is empty.
 */
const initDatabaseWithDefaults = () => {
  db.defaults({
    tabs: [],
    selectedTab: null,
    isTabAreaOpen: false
  })
  .write();
}

/**
 * 
 */
const loadPersistedState = () => {
  return db.getState();
}

/**
 * 
 * @param {*} id 
 * @param {*} index 
 * @param {*} name 
 */
const createTab = (id, index, name) => {
  db.get('tabs')
    .push({ id, index, name, content: "" })
    .write();
}

/**
 * Updates the content of a tab (identified by id) with some new content.
 * @param {*} id - id of the tab to be updated.
 * @param {*} newContent - new content for that tab.
 */
const updateTabContent = (id, newContent) => {
  db.get('tabs')
    .find({ id })
    .assign({ content: newContent })
    .write();
}

/**
 * Updates the name of a tab (identified by id) with a new name.
 * @param {*} id - old name of the tab.
 * @param {*} newName - new name for the tab.
 */
const updateTabName = (id, newName) => {
  db.get('tabs')
    .find({ id })
    .assign({ name: newName })
    .write();
}

const swapTabs = (id, isMovingUp) => {
  const tab1OldIndex = db
    .get('tabs')
    .find({ id })
    .value()
    .index;
  
  db.get('tabs')
    .find({ index: isMovingUp ? tab1OldIndex - 1 : tab1OldIndex + 1 })
    .assign({ index: tab1OldIndex })
    .write();

  db.get('tabs')
    .find({ id })
    .assign({ index: isMovingUp ? tab1OldIndex - 1 : tab1OldIndex + 1 })
    .write();
}

/**
 * Completely deletes a tab, given its id.
 * @param {*} id - id of the tab to be deleted.
 */
const deleteTab = id => {
  const indexOfTabToDelete = db
    .get('tabs')
    .find({ id })
    .value()
    .index;

  db.get('tabs')
    .remove({ id })
    .write();

  db.get('tabs')
    .filter(tab => tab.index > indexOfTabToDelete)
    .each(tab => { tab.index = tab.index - 1 })
    .write();
}

/**
 * 
 * @param {*} tabId 
 */
const saveCurrentlySelectedTab = tabId => {
  db.set('selectedTab', tabId)
    .write();
}

/**
 * 
 */
const saveIsTabAreaOpen = () => {
  const wasOpen = db.get('isTabAreaOpen').value();
  db.set('isTabAreaOpen', !wasOpen)
    .write();
}

const getIsTabAreaOpen = () => {
  return db
    .get('isTabAreaOpen')
    .value();
}

module.exports = {
  initDatabaseWithDefaults,
  loadPersistedState,
  createTab,
  updateTabContent,
  updateTabName,
  swapTabs,
  deleteTab,
  saveCurrentlySelectedTab,
  saveIsTabAreaOpen,
  getIsTabAreaOpen,
}
