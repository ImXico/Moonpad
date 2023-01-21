import { Actions } from ".";

type ShowToastPopupAction = {
  type: Actions.ShowToastPopup;
  message: string;
};

type HideToastPopup = {
  type: Actions.HideToastPopup;
};

export const showToastPopup = (message: string): ShowToastPopupAction => ({
  type: Actions.ShowToastPopup,
  message,
});

export const hideToastPopup = (): HideToastPopup => ({
  type: Actions.HideToastPopup,
});
