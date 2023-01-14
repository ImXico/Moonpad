import * as ipcActions from "../data/ipcActions";
const { ipcRenderer } = window.require("electron");

export const SELECT_TAB = "SELECT_TAB";

const selectTab = (tabId) => {
  return {
    type: SELECT_TAB,
    tabId,
  };
};

export const selectTabAndPersist = (tabId) => {
  return (dispatch) => {
    dispatch(selectTab(tabId));
    ipcRenderer.send(ipcActions.SELECT_TAB, { tabId });
  };
};
