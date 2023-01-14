import { TOGGLE_OPEN_TAB_AREA } from "../actions/isTabAreaOpen";

const isTabAreaOpen = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_OPEN_TAB_AREA:
      return action.isNowOpen;
    default:
      return state;
  }
};

export default isTabAreaOpen;
