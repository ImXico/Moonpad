import { Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../data/ipcActions";
import { showToastPopup } from "./toastPopup";

const { ipcRenderer } = window.require("electron");

type CreateTabAction = {
  type: Actions.CreateTab;
  newTab: {
    id: string;
    index: number;
    name: string;
    content: string;
  };
};

type UpdateTabNameAction = {
  type: Actions.UpdateTabName;
  id: string;
  newName: string;
};

type UpdateTabContentAction = {
  type: Actions.UpdateTabContent;
  id: string;
  newContent: string;
};

type SwapTabsAction = {
  type: Actions.SwapTabs;
  id: string;
  isMovingUp: boolean;
};

type DeleteTabAction = {
  type: Actions.DeleteTab;
  id: string;
};

const createTab = (
  id: string,
  index: number,
  name: string
): CreateTabAction => ({
  type: Actions.CreateTab,
  newTab: { id, index, name, content: "" },
});

const updateTabName = (id: string, newName: string): UpdateTabNameAction => ({
  type: Actions.UpdateTabName,
  id,
  newName,
});

const updateTabContent = (
  id: string,
  newContent: string
): UpdateTabContentAction => ({
  type: Actions.UpdateTabContent,
  id,
  newContent,
});

const moveTabUp = (id: string): SwapTabsAction => ({
  type: Actions.SwapTabs,
  isMovingUp: true,
  id,
});

const moveTabDown = (id: string): SwapTabsAction => ({
  type: Actions.SwapTabs,
  isMovingUp: false,
  id,
});

const deleteTab = (id: string): DeleteTabAction => ({
  type: Actions.DeleteTab,
  id,
});

export const createTabAndPersist =
  (id: string, index: number, name: string) => (dispatch: Dispatch) => {
    dispatch(createTab(id, index, name));
    ipcRenderer.send(IpcActions.CreateTab, { id, index, name });
  };

export const updateTabNameAndPersist =
  (id: string, newName: string) => (dispatch: Dispatch) => {
    dispatch(updateTabName(id, newName));
    ipcRenderer.send(IpcActions.UpdateTabName, { id, newName });
  };

export const updateTabContentAndPersist =
  (id: string, newContent: string) => (dispatch: Dispatch) => {
    dispatch(updateTabContent(id, newContent));
    ipcRenderer.send(IpcActions.UpdateTabContent, { id, newContent });
  };

export const moveTabUpAndPersist = (id: string) => (dispatch: Dispatch) => {
  dispatch(moveTabUp(id));
  ipcRenderer.send(IpcActions.SwapTabs, { id, isMovingUp: true });
};

export const moveTabDownAndPersist = (id: string) => (dispatch: Dispatch) => {
  dispatch(moveTabDown(id));
  ipcRenderer.send(IpcActions.SwapTabs, { id, isMovingUp: false });
};

export const deleteTabAndPersist =
  (id: string, name: string) => (dispatch: Dispatch) => {
    dispatch(deleteTab(id));
    ipcRenderer.send(IpcActions.DeleteTab, { id });
    dispatch(showToastPopup(`${name} deleted!`));
  };
