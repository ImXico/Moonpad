import { connect } from "react-redux";
import { showToastPopup } from "../actions/toastPopup";
import { toggleColorThemeAndPersist } from "../actions/colorTheme";
import App from "../components/App/App";
import { State } from "../reducers";
import { Dispatch } from "redux";

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  showToast: (message) => dispatch(showToastPopup(message)),
  toggleColorTheme: (isNowLightMode) =>
    dispatch(toggleColorThemeAndPersist(isNowLightMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
