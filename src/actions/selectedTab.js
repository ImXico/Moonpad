import * as ipcActions from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

export const SELECT_TAB = "SELECT_TAB";

const selectTab = (tabId) => ({
  type: SELECT_TAB,
  tabId,
});

export const selectTabAndPersist = (tabId) => (dispatch) => {
  dispatch(selectTab(tabId));
  ipcRenderer.send(ipcActions.SELECT_TAB, { tabId });
};
