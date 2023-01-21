import { Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

export type ToggleColorThemeAction = {
  type: Actions.ToggleTheme;
  isNowDarkTheme: boolean;
};

const toggleColorTheme = (isNowDarkTheme: boolean): ToggleColorThemeAction => ({
  type: Actions.ToggleTheme,
  isNowDarkTheme,
});

export const toggleColorThemeAndPersist =
  (isNowDarkTheme: boolean) => (dispatch: Dispatch) => {
    dispatch(toggleColorTheme(isNowDarkTheme));
    ipcRenderer.send(IpcActions.ToggleColorTheme);
  };
