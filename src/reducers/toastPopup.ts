import { Actions } from "../actions";
import {
  HideToastPopupAction,
  ShowToastPopupAction,
} from "../actions/toastPopup";

export type ToastPopupState = {
  showing: boolean;
  message: string;
};

type ToastPopupAction = ShowToastPopupAction | HideToastPopupAction;

const defaultState: ToastPopupState = {
  showing: false,
  message: "",
};

const toastPopup = (
  state: ToastPopupState = defaultState,
  action: ToastPopupAction
) => {
  switch (action.type) {
    case Actions.ShowToastPopup:
      return { showing: true, message: action.message };
    case Actions.HideToastPopup:
      return { showing: false, message: "" };
    default:
      return state;
  }
};

export default toastPopup;
