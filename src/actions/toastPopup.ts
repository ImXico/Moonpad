import { Actions } from ".";

export type ShowToastPopupAction = {
  type: Actions.ShowToastPopup;
  message: string;
};

export type HideToastPopupAction = {
  type: Actions.HideToastPopup;
};

export const showToastPopup = (message: string): ShowToastPopupAction => ({
  type: Actions.ShowToastPopup,
  message,
});

export const hideToastPopup = (): HideToastPopupAction => ({
  type: Actions.HideToastPopup,
});
