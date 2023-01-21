import { Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

export type ToggleOpenTabAreaAction = {
  type: Actions.ToggleOpenTabArea;
  isNowOpen: boolean;
};

const toggleOpenTabArea = (isNowOpen: boolean): ToggleOpenTabAreaAction => ({
  type: Actions.ToggleOpenTabArea,
  isNowOpen,
});

export const toggleOpenTabAreaAndPersist =
  (isNowOpen: boolean) => (dispatch: Dispatch) => {
    dispatch(toggleOpenTabArea(isNowOpen));
    ipcRenderer.send(IpcActions.ToggleOpenTabArea);
  };
