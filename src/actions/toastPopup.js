export const SHOW_TOAST_POPUP = "SHOW_TOAST_POPUP";
export const HIDE_TOAST_POPUP = "HIDE_TOAST_POPUP";

export const showToastPopup = (message) => ({
  type: SHOW_TOAST_POPUP,
  message,
});

export const hideToastPopup = () => ({
  type: HIDE_TOAST_POPUP,
});
