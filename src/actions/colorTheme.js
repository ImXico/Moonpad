import * as ipcActions from "../data/ipcActions";

const { ipcRenderer } = window.require("electron");

export const TOGGLE_COLOR_THEME = "TOGGLE_COLOR_THEME";

const toggleColorTheme = (isNowDarkTheme) => ({
  type: TOGGLE_COLOR_THEME,
  isNowDarkTheme,
});

export const toggleColorThemeAndPersist = (isNowDarkTheme) => (dispatch) => {
  dispatch(toggleColorTheme(isNowDarkTheme));
  ipcRenderer.send(ipcActions.TOGGLE_COLOR_THEME);
};
