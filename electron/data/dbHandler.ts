import { app } from "electron";
import low, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import {
  DEFAULT_IS_DARK_THEME,
  DEFAULT_IS_TAB_AREA_OPEN,
  DEFAULT_IS_WINDOW_ALWAYS_ON_TOP,
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
} from "./defaultSettings";
import { LowDbSchema } from "./schema";

const DATABASE_FILE_NAME = `${app.getPath("userData")}/data.json`;

let db: LowdbSync<LowDbSchema> | null = null;

/**
 * Point the lowdb adapter to the userData file.
 * This must be called in a point where the userData file has already
 * been created for the app.
 */
export const setupDatabaseSource = () => {
  const adapter = new FileSync(DATABASE_FILE_NAME);
  db = low(adapter);
};

/**
 * Defines the schema and initialize the local JSON database with the default values.
 * This is necessary on first use, where the db is empty.
 */
export const initDatabaseWithDefaults = () => {
  const defaultNewTab = {
    id: `New Tab|${Date.now()}`,
    index: 1,
    name: "New Tab",
    content: "",
  };

  db?.defaults({
    tabs: [defaultNewTab],
    selectedTab: defaultNewTab.id,
    isTabAreaOpen: DEFAULT_IS_TAB_AREA_OPEN,
    isDarkTheme: DEFAULT_IS_DARK_THEME,
    windowSettings: {
      isAlwaysOnTop: DEFAULT_IS_WINDOW_ALWAYS_ON_TOP,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    },
  }).write();
};

/**
 * Load eveything from the local database that can be mapped to Redux state.
 * 'windowSettings' will be excluded, as they are not actually part of Redux state.
 */
export const loadPersistedState = () => {
  const state = db?.getState();
  const stateClone = { ...state };
  delete stateClone.windowSettings;
  return stateClone;
};

/**
 * Create a new tab in the databse, given its id, (current) index in the tab area, and name.
 * The content of a newly-created tab is always empty.
 * @param {*} id - id of the tab to be created. It is calculated in the client-side (but should always be unique).
 * @param {*} index - index, in the tabs area, of the tab to be created.
 * @param {*} name - name of the new tab to be created. New tabs have a default name (client-side).
 */
export const createTab = (id: string, index: number, name: string) => {
  db?.get("tabs").push({ id, index, name, content: "" }).write();
};

/**
 * Updates the content of a tab (identified by id) with some new content.
 * @param {*} id - id of the tab to be updated.
 * @param {*} newContent - new content for that tab.
 */
export const updateTabContent = (id: string, newContent: string) => {
  db?.get("tabs").find({ id }).assign({ content: newContent }).write();
};

/**
 * Updates the name of a tab (identified by id) with a new name.
 * @param {*} id - old name of the tab.
 * @param {*} newName - new name for the tab.
 */
export const updateTabName = (id: string, newName: string) => {
  db?.get("tabs").find({ id }).assign({ name: newName }).write();
};

/**
 * Given the id of one tab, swaps its index with that of another tab (the one
 * immediately above, if isMovingUp === true, or the one immediately below otherwise).
 * @param {*} id - id of one of the tabs to be moved.
 * @param {*} isMovingUp - whether we're swaping this tab with the one above or the one below it.
 */
export const swapTabs = (id: string, isMovingUp: boolean) => {
  const tab1OldIndex = db?.get("tabs").find({ id }).value().index;

  if (tab1OldIndex === undefined) {
    return;
  }

  db?.get("tabs")
    .find({ index: isMovingUp ? tab1OldIndex - 1 : tab1OldIndex + 1 })
    .assign({ index: tab1OldIndex })
    .write();

  db?.get("tabs")
    .find({ id })
    .assign({ index: isMovingUp ? tab1OldIndex - 1 : tab1OldIndex + 1 })
    .write();
};

/**
 * Completely deletes a tab, given its id.
 * The indexes of the tabs that would come *after* the deleted one in the
 * tabs area are also updated (i.e., decremented).
 * @param {*} id - id of the tab to be deleted.
 */
export const deleteTab = (id: string) => {
  const indexOfTabToDelete = db?.get("tabs").find({ id }).value().index;

  if (indexOfTabToDelete === undefined) {
    return;
  }

  db?.get("tabs").remove({ id }).write();

  db?.get("tabs")
    .filter((tab) => tab.index > indexOfTabToDelete)
    .each((tab) => {
      // eslint-disable-next-line operator-assignment, no-param-reassign
      tab.index = tab.index - 1;
    })
    .write();
};

/**
 * Save which tab is the currently-selected one.
 * When the app is closed and loaded again, this tab will stay as the currently-selected one.
 * @param {*} tabId - id of the tab that's currently selected.
 */
export const saveCurrentlySelectedTab = (tabId: string) => {
  db?.set("selectedTab", tabId).write();
};

/**
 * Save whether or not the tab area is currently open.
 * When the app is closed and loaded again, this will be looked-up and refreshed accordingly.
 */
export const saveIsTabAreaOpen = () => {
  const wasOpen = db?.get("isTabAreaOpen").value();
  db?.set("isTabAreaOpen", !wasOpen).write();
};

/**
 * Save whether or not the app should be always on top of other windows.
 * When the app is closed and loaded again, this will be looked-up and refreshed accordingly.
 */
export const saveIsAlwaysOnTop = () => {
  const wasAlwaysOnTop = db?.get("windowSettings.isAlwaysOnTop").value();
  db?.set("windowSettings.isAlwaysOnTop", !wasAlwaysOnTop).write();
};

/**
 * Save whether or not the currently active color theme is the dark theme.
 */
export const saveIsDarkTheme = () => {
  const wasDarkTheme = db?.get("isDarkTheme").value();
  db?.set("isDarkTheme", !wasDarkTheme).write();
};

/**
 * Save the most up-to-date window dimensions so that they can be restored in the next session.
 * @param {*} width - up-to-date window width.
 * @param {*} height - up-to-date window height.
 */
export const saveWindowDimensions = (width: number, height: number) => {
  db?.get("windowSettings").assign({ width, height }).write();
};

/**
 * Load all window settings (to initialize the browser window).
 */
export const loadWindowSettings = () => db?.get("windowSettings").value();
