import {
  TOGGLE_ALWAYS_ON_TOP,
  UPDATE_WINDOW_DIMENSIONS
} from '../actions/windowSettings';

const windowSettings = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_ALWAYS_ON_TOP:
      return { ...state, isAlwaysOnTop: action.isNowAlwaysOnTop };
    case UPDATE_WINDOW_DIMENSIONS:
      return {...state, width: action.newWidth, height: action.newHeight }
    default:
      return state;
  }
}

export default windowSettings;
