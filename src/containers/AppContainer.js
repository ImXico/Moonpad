import { connect } from "react-redux";
import { showToastPopup } from "../actions/toastPopup";
import { toggleColorThemeAndPersist } from "../actions/colorTheme";
import App from "../components/App/App";

const mapStateToProps = (state, ownProps) => {
  return {
    isDarkTheme: state.isDarkTheme,
    hasCustomTitleBar: ownProps.hasCustomTitleBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showToast: (message) => dispatch(showToastPopup(message)),
    toggleColorTheme: (isNowLightMode) =>
      dispatch(toggleColorThemeAndPersist(isNowLightMode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
