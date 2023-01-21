import { Actions } from "../actions";
import { ToggleColorThemeAction } from "../actions/colorTheme";

type ThemeState = boolean;
type ThemeAction = ToggleColorThemeAction;

const defaultState: ThemeState = true;

const isDarkTheme = (state: ThemeState = defaultState, action: ThemeAction) => {
  switch (action.type) {
    case Actions.ToggleTheme:
      return action.isNowDarkTheme;
    default:
      return state;
  }
};

export default isDarkTheme;
