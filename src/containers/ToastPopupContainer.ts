import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideToastPopup, HideToastPopupAction } from "../actions/toastPopup";
import { ToastPopup } from "../components/ToastPopup/ToastPopup";
import { State } from "../reducers";

export type ConnectedProps = {
  toastShowing: boolean;
  toastMessage: string;
};

export type DispatchProps = {
  hideToast: () => void;
};

const mapStateToProps = (state: State): ConnectedProps => ({
  toastShowing: state.toastPopup.showing,
  toastMessage: state.toastPopup.message,
});

const mapDispatchToProps = (
  dispatch: Dispatch<HideToastPopupAction>
): DispatchProps => ({
  hideToast: () => dispatch(hideToastPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastPopup);
