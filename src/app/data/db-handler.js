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
  db.defaults({ tabs: [] })
    .write();
}

/**
 * Returns all the tab objects under 'tabs'.
 * @returns an array of tab objects, where each tab has an index, name and content.
 */
const loadAllTabs = () => {
  return db
    .get('tabs')
    .value();
}

/**
 * Creates a new tab with a given name and index, and empty content.
 * The index will be equal to the number of tabs there is.
 * @param {*} index - index of the new tab to be created.
 * @param {*} name - name of the new tab to be created.
 */
const createNewTab = (index, name) => {
    db.get('tabs')
      .push({ index: index, name: name, content: "" })
      .write();
}

/**
 * Updates the content of a tab (identified by name) with some new content.
 * @param {*} name - name of the tab to be updated.
 * @param {*} newContent - new content for that tab.
 */
const updateTabContent = (name, newContent) => {
  db.get('tabs')
    .find({ name: name })
    .assign({ content: newContent })
    .write();
}

/**
 * Updates the name of a tab (identified by name) with a new name.
 * @param {*} oldName - old name of the tab.
 * @param {*} newName - new name for the tab.
 */
const updateTabName = (oldName, newName) => {
  db.get('tabs')
    .find({ name: oldName })
    .assign({ name: newName })
    .write();
}

/**
 * Updates the index of a tab (identified by name) with a new index.
 * @param {*} name - name of the tab.
 * @param {*} newIndex - new index of the tab.
 */
const updateTabIndex = (name, newIndex) => {
  db.get('tabs')
    .find({ name: name })
    .assign({ index: newIndex })
    .write();
}

/**
 * Deletes a tab (index, name and content).
 * @param {*} name - name of the tab to be deleted.
 */
const deleteTab = (name) => {
  db.get('tabs')
    .remove({ name: name })
    .write();
}

module.exports = {
  initDatabaseWithDefaults,
  loadAllTabs,
  createNewTab,
  updateTabContent,
  updateTabName,
  updateTabIndex,
  deleteTab,
}
