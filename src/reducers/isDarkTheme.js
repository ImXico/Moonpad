import { TOGGLE_COLOR_THEME } from "../actions/colorTheme";

const isDarkTheme = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_COLOR_THEME:
      return action.isNowDarkTheme;
    default:
      return state;
  }
};

export default isDarkTheme;
