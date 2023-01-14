export const SHOW_TOAST_POPUP = "SHOW_TOAST_POPUP";
export const HIDE_TOAST_POPUP = "HIDE_TOAST_POPUP";

export const showToastPopup = (message) => {
  return {
    type: SHOW_TOAST_POPUP,
    message,
  };
};

export const hideToastPopup = () => {
  return {
    type: HIDE_TOAST_POPUP,
  };
};
