import { TOGGLE_ALWAYS_ON_TOP } from '../actions/isAlwaysOnTop';

const isAlwaysOnTop = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ALWAYS_ON_TOP:
      return action.isNowAlwaysOnTop;
    default:
      return state;
  }
}

export default isAlwaysOnTop;
