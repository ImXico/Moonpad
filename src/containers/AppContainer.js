import { connect } from "react-redux";
import { showToastPopup } from "../actions/toastPopup";
import { toggleColorThemeAndPersist } from "../actions/colorTheme";
import App from "../components/App/App";

const mapStateToProps = (state) => ({
  isDarkTheme: state.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  showToast: (message) => dispatch(showToastPopup(message)),
  toggleColorTheme: (isNowLightMode) =>
    dispatch(toggleColorThemeAndPersist(isNowLightMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
