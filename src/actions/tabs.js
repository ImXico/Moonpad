import * as ipcActions from "../data/ipcActions";
import { showToastPopup } from "./toastPopup";

const { ipcRenderer } = window.require("electron");

export const RECEIVE_UPDATED_TABS = "RECEIVE_UPDATED_TABS";
export const CREATE_TAB = "CREATE_TAB";
export const DELETE_TAB = "DELETE_TAB";
export const UPDATE_TAB_NAME = "UPDATE_TAB_NAME";
export const UPDATE_TAB_CONTENT = "UPDATE_TAB_CONTENT";
export const SWAP_TABS = "SWAP_TABS";

const createTab = (id, index, name) => ({
  type: CREATE_TAB,
  newTab: { id, index, name, content: "" },
});

const updateTabName = (id, newName) => ({
  type: UPDATE_TAB_NAME,
  id,
  newName,
});

const updateTabContent = (id, newContent) => ({
  type: UPDATE_TAB_CONTENT,
  id,
  newContent,
});

const moveTabUp = (id) => ({
  type: SWAP_TABS,
  isMovingUp: true,
  id,
});

const moveTabDown = (id) => ({
  type: SWAP_TABS,
  isMovingUp: false,
  id,
});

const deleteTab = (id) => ({
  type: DELETE_TAB,
  id,
});

export const createTabAndPersist = (id, index, name) => (dispatch) => {
  dispatch(createTab(id, index, name));
  ipcRenderer.send(ipcActions.CREATE_TAB, { id, index, name });
};

export const updateTabNameAndPersist = (id, newName) => (dispatch) => {
  dispatch(updateTabName(id, newName));
  ipcRenderer.send(ipcActions.UPDATE_TAB_NAME, { id, newName });
};

export const updateTabContentAndPersist = (id, newContent) => (dispatch) => {
  dispatch(updateTabContent(id, newContent));
  ipcRenderer.send(ipcActions.UPDATE_TAB_CONTENT, { id, newContent });
};

export const moveTabUpAndPersist = (id) => (dispatch) => {
  dispatch(moveTabUp(id));
  ipcRenderer.send(ipcActions.SWAP_TABS, { id, isMovingUp: true });
};

export const moveTabDownAndPersist = (id) => (dispatch) => {
  dispatch(moveTabDown(id));
  ipcRenderer.send(ipcActions.SWAP_TABS, { id, isMovingUp: false });
};

export const deleteTabAndPersist = (id, name) => (dispatch) => {
  dispatch(deleteTab(id));
  ipcRenderer.send(ipcActions.DELETE_TAB, { id });
  dispatch(showToastPopup(`${name} deleted!`));
};
