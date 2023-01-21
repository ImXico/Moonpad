import { Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

type SelectTabAction = {
  type: Actions.SelectTab;
  tabId: string;
};

const selectTab = (tabId: string): SelectTabAction => ({
  type: Actions.SelectTab,
  tabId,
});

export const selectTabAndPersist = (tabId: string) => (dispatch: Dispatch) => {
  dispatch(selectTab(tabId));
  ipcRenderer.send(IpcActions.SelectTab, { tabId });
};
