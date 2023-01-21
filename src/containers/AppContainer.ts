import { connect } from "react-redux";
import { showToastPopup, ShowToastPopupAction } from "../actions/toastPopup";
import {
  ToggleColorThemeAction,
  toggleColorThemeAndPersist,
} from "../actions/colorTheme";
import App from "../components/App/App";
import { State } from "../reducers";
import { ThunkDispatch } from "redux-thunk";

export type ConnectedProps = {
  isDarkTheme: boolean;
};

export type DispatchProps = {
  showToast: (message: string) => void;
  toggleColorTheme: (isNowLightMode: boolean) => void;
};

const mapStateToProps = (state: State): ConnectedProps => ({
  isDarkTheme: state.isDarkTheme,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    State,
    {},
    ShowToastPopupAction | ToggleColorThemeAction
  >
): DispatchProps => ({
  showToast: (message) => dispatch(showToastPopup(message)),
  toggleColorTheme: (isNowLightMode) =>
    dispatch(toggleColorThemeAndPersist(isNowLightMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
