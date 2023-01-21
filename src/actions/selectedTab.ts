import { Action, ActionCreator, Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

export type SelectTabAction = Action<Actions.SelectTab> & {
  tabId: string;
};

const selectTab: ActionCreator<SelectTabAction> = (
  tabId: string
): SelectTabAction => ({
  type: Actions.SelectTab,
  tabId,
});

export const selectTabAndPersist =
  (tabId: string) => (dispatch: Dispatch<SelectTabAction>) => {
    dispatch(selectTab(tabId));
    ipcRenderer.send(IpcActions.SelectTab, { tabId });
  };
