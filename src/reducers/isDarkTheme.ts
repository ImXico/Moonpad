import { Actions } from "../actions";
import { ToggleColorThemeAction } from "../actions/colorTheme";

type State = {
  isNowDarkTheme: boolean;
};

type Action = ToggleColorThemeAction;

const defaultState: State = {
  isNowDarkTheme: true,
};

const isDarkTheme = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case Actions.ToggleTheme:
      return action.isNowDarkTheme;
    default:
      return state;
  }
};

export default isDarkTheme;
