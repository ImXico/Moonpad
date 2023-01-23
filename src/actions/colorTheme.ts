import { Action, ActionCreator, Dispatch } from "redux";
import { Actions } from ".";
import { IpcActions } from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

export type ToggleColorThemeAction = Action<Actions.ToggleTheme> & {
  isNowDarkTheme: boolean;
};

const toggleColorTheme: ActionCreator<ToggleColorThemeAction> = (
  isNowDarkTheme: boolean
): ToggleColorThemeAction => ({
  type: Actions.ToggleTheme,
  isNowDarkTheme,
});

export const toggleColorThemeAndPersist =
  (isNowDarkTheme: boolean) => (dispatch: Dispatch<ToggleColorThemeAction>) => {
    dispatch(toggleColorTheme(isNowDarkTheme));
    ipcRenderer.send(IpcActions.ToggleColorTheme);
  };
