import { Action, ActionCreator, Dispatch } from "redux";
import { Actions } from ".";
import { showToastPopup, ShowToastPopupAction } from "./toastPopup";
import { IpcActions } from "../shared/ipcActions";

const { ipcRenderer } = window.require("electron");

export type CreateTabAction = Action<Actions.CreateTab> & {
  newTab: {
    id: string;
    index: number;
    name: string;
    content: string;
  };
};

export type UpdateTabNameAction = Action<Actions.UpdateTabName> & {
  id: string;
  newName: string;
};

export type UpdateTabContentAction = Action<Actions.UpdateTabContent> & {
  id: string;
  newContent: string;
};

export type SwapTabsAction = Action<Actions.SwapTabs> & {
  type: Actions.SwapTabs;
  id: string;
  isMovingUp: boolean;
};

export type DeleteTabAction = Action<Actions.DeleteTab> & {
  type: Actions.DeleteTab;
  id: string;
};

const createTab: ActionCreator<CreateTabAction> = (
  id: string,
  index: number,
  name: string
): CreateTabAction => ({
  type: Actions.CreateTab,
  newTab: { id, index, name, content: "" },
});

const updateTabName: ActionCreator<UpdateTabNameAction> = (
  id: string,
  newName: string
): UpdateTabNameAction => ({
  type: Actions.UpdateTabName,
  id,
  newName,
});

const updateTabContent: ActionCreator<UpdateTabContentAction> = (
  id: string,
  newContent: string
): UpdateTabContentAction => ({
  type: Actions.UpdateTabContent,
  id,
  newContent,
});

const moveTabUp: ActionCreator<SwapTabsAction> = (
  id: string
): SwapTabsAction => ({
  type: Actions.SwapTabs,
  isMovingUp: true,
  id,
});

const moveTabDown: ActionCreator<SwapTabsAction> = (
  id: string
): SwapTabsAction => ({
  type: Actions.SwapTabs,
  isMovingUp: false,
  id,
});

const deleteTab: ActionCreator<DeleteTabAction> = (
  id: string
): DeleteTabAction => ({
  type: Actions.DeleteTab,
  id,
});

export const createTabAndPersist =
  (id: string, index: number, name: string) =>
  (dispatch: Dispatch<CreateTabAction>) => {
    dispatch(createTab(id, index, name));
    ipcRenderer.send(IpcActions.CreateTab, { id, index, name });
  };

export const updateTabNameAndPersist =
  (id: string, newName: string) =>
  (dispatch: Dispatch<UpdateTabNameAction>) => {
    dispatch(updateTabName(id, newName));
    ipcRenderer.send(IpcActions.UpdateTabName, { id, newName });
  };

export const updateTabContentAndPersist =
  (id: string, newContent: string) =>
  (dispatch: Dispatch<UpdateTabContentAction>) => {
    dispatch(updateTabContent(id, newContent));
    ipcRenderer.send(IpcActions.UpdateTabContent, { id, newContent });
  };

export const moveTabUpAndPersist =
  (id: string) => (dispatch: Dispatch<SwapTabsAction>) => {
    dispatch(moveTabUp(id));
    ipcRenderer.send(IpcActions.SwapTabs, { id, isMovingUp: true });
  };

export const moveTabDownAndPersist =
  (id: string) => (dispatch: Dispatch<SwapTabsAction>) => {
    dispatch(moveTabDown(id));
    ipcRenderer.send(IpcActions.SwapTabs, { id, isMovingUp: false });
  };

export const deleteTabAndPersist =
  (id: string, name: string) =>
  (dispatch: Dispatch<DeleteTabAction | ShowToastPopupAction>) => {
    dispatch(deleteTab(id));
    ipcRenderer.send(IpcActions.DeleteTab, { id });
    dispatch(showToastPopup(`${name} deleted!`));
  };
