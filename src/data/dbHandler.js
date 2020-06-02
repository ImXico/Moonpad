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
    tabs: [{
      "id": `New Tab|${Date.now()}`,
      "index": 1,
      "name": "New Tab",
      "content": ""
    }],
    selectedTab: null,
    isTabAreaOpen: false,
    isAlwaysOnTop: false
  })
  .write();
}

/**
 * Load eveything that is in the local database.
 * This includes all tabs info and all 'settings'/'preferences'.
 */
const loadPersistedState = () => {
  return db.getState();
}

/**
 * Create a new tab in the databse, given its id, (current) index in the tab area, and name.
 * The content of a newly-created tab is always empty.
 * @param {*} id - id of the tab to be created. It is calculated in the client-side (but should always be unique).
 * @param {*} index - index, in the tabs area, of the tab to be created.
 * @param {*} name - name of the new tab to be created. New tabs have a default name (client-side).
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

/**
 * Given the id of one tab, swaps its index with that of another tab (the one
 * immediately above, if isMovingUp === true, or the one immediately below otherwise).
 * @param {*} id - id of one of the tabs to be moved.
 * @param {*} isMovingUp - whether we're swaping this tab with the one above or the one below it.
 */
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
 * The indexes of the tabs that would come *after* the deleted one in the 
 * tabs area are also updated (i.e., decremented).
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
 * Save which tab is the currently-selected one.
 * When the app is closed and loaded again, this tab will stay as the currently-selected one.
 * @param {*} tabId - id of the tab that's currently selected.
 */
const saveCurrentlySelectedTab = tabId => {
  db.set('selectedTab', tabId)
    .write();
}

/**
 * Save whether or not the tab area is currently open.
 * When the app is closed and loaded again, this will be looked-up and refreshed accordingly.
 */
const saveIsTabAreaOpen = () => {
  const wasOpen = db.get('isTabAreaOpen').value();
  db.set('isTabAreaOpen', !wasOpen)
    .write();
}

/**
 * Save whether or not the app should be always on top of other windows.
 * When the app is closed and loaded again, this will be looked-up and refreshed accordingly.
 */
const saveIsAlwaysOnTop = () => {
  const wasAlwaysOnTop = db.get('isAlwaysOnTop').value();
  db.set('isAlwaysOnTop', !wasAlwaysOnTop)
    .write();
}

/**
 * 
 */
const loadWindowSettings = () => {
  const wasAlwaysOnTop = db.get('isAlwaysOnTop').value();
  return { wasAlwaysOnTop, };
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
  saveIsAlwaysOnTop,
  loadWindowSettings
}
