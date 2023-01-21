import { Action, ActionCreator } from "redux";
import { Actions } from ".";

export type ShowToastPopupAction = Action<Actions.ShowToastPopup> & {
  message: string;
};

export type HideToastPopupAction = Action<Actions.HideToastPopup>;

export const showToastPopup: ActionCreator<ShowToastPopupAction> = (
  message: string
): ShowToastPopupAction => ({
  type: Actions.ShowToastPopup,
  message,
});

export const hideToastPopup: ActionCreator<HideToastPopupAction> = () => ({
  type: Actions.HideToastPopup,
});
