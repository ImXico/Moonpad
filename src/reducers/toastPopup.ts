import { Actions } from "../actions";
import {
  HideToastPopupAction,
  ShowToastPopupAction,
} from "../actions/toastPopup";

type State = {
  showing: boolean;
  message: string;
};

type Action = ShowToastPopupAction | HideToastPopupAction;

const defaultState: State = {
  showing: false,
  message: "",
};

const toastPopup = (state: State = defaultState, action: Action) => {
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
