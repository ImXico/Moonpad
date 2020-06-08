import { SHOW_TOAST_POPUP, HIDE_TOAST_POPUP } from '../actions/toastPopup';

const toastPopup = (state = { showing: false, message: '' }, action) => {
  switch (action.type) {
    case SHOW_TOAST_POPUP:
      return { showing: true, message: action.message };
    case HIDE_TOAST_POPUP:
      return { showing: false, message: '' }
    default:
      return state;
  }
}

export default toastPopup;
