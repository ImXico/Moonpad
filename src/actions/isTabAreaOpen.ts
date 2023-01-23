import { Action, ActionCreator, Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../shared/ipcActions";

const { ipcRenderer } = window.require("electron");

export type ToggleOpenTabAreaAction = Action<Actions.ToggleOpenTabArea> & {
  isNowOpen: boolean;
};

const toggleOpenTabArea: ActionCreator<ToggleOpenTabAreaAction> = (
  isNowOpen: boolean
): ToggleOpenTabAreaAction => ({
  type: Actions.ToggleOpenTabArea,
  isNowOpen,
});

export const toggleOpenTabAreaAndPersist =
  (isNowOpen: boolean) => (dispatch: Dispatch<ToggleOpenTabAreaAction>) => {
    dispatch(toggleOpenTabArea(isNowOpen));
    ipcRenderer.send(IpcActions.ToggleOpenTabArea);
  };
