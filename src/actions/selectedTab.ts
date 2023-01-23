import { Action, ActionCreator, Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../shared/ipcActions";

const { ipcRenderer } = window.require("electron");

export type SelectTabAction = Action<Actions.SelectTab> & {
  tabId: string | null;
};

const selectTab: ActionCreator<SelectTabAction> = (
  tabId: string | null
): SelectTabAction => ({
  type: Actions.SelectTab,
  tabId,
});

export const selectTabAndPersist =
  (tabId: string | null) => (dispatch: Dispatch<SelectTabAction>) => {
    dispatch(selectTab(tabId));
    ipcRenderer.send(IpcActions.SelectTab, { tabId });
  };
