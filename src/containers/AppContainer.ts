import { Action } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ThemeState } from "../reducers/isDarkTheme";
import { showToastPopup } from "../actions/toastPopup";
import { toggleColorThemeAndPersist } from "../actions/colorTheme";
import { App } from "../components/App/App";
import { State } from "../reducers";

export type ConnectedProps = {
  isDarkTheme: ThemeState;
};

export type DispatchProps = {
  showToast: (message: string) => void;
  toggleColorTheme: (isNowLightMode: boolean) => void;
};

const mapStateToProps = (state: State): ConnectedProps => ({
  isDarkTheme: state.isDarkTheme,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, unknown, Action>
): DispatchProps => ({
  showToast: (message) => dispatch(showToastPopup(message)),
  toggleColorTheme: (isNowLightMode) =>
    dispatch(toggleColorThemeAndPersist(isNowLightMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
