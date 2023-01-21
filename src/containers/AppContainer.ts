import { connect } from "react-redux";
import { showToastPopup, ShowToastPopupAction } from "../actions/toastPopup";
import {
  ToggleColorThemeAction,
  toggleColorThemeAndPersist,
} from "../actions/colorTheme";
import App from "../components/App/App";
import { State } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { ThemeState } from "../reducers/isDarkTheme";

export type ConnectedProps = {
  isDarkTheme: ThemeState;
};

export type DispatchProps = {
  showToast: (message: string) => void;
  toggleColorTheme: (isNowLightMode: boolean) => void;
};

type DispatchableActions = ShowToastPopupAction | ToggleColorThemeAction;

const mapStateToProps = (state: State): ConnectedProps => ({
  isDarkTheme: state.isDarkTheme,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, {}, DispatchableActions>
): DispatchProps => ({
  showToast: (message) => dispatch(showToastPopup(message)),
  toggleColorTheme: (isNowLightMode) =>
    dispatch(toggleColorThemeAndPersist(isNowLightMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
