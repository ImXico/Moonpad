import React from "react";
import PropTypes from "prop-types";
import {
  TOGGLE_ALWAYS_ON_TOP,
  TOGGLE_ALWAYS_ON_TOP_RESPONSE,
} from "../../data/ipcActions";
import ThemeWrapper, { Themes } from "../ThemeWrapper/ThemeWrapper";
import TitleBar, { TitleBarStyles } from "../TitleBar/TitleBar";
import ToastPopup from "../ToastPopup/ToastPopup";
import TabAreaContainer from "../../containers/TabAreaContainer";
import TextAreaContainer from "../../containers/TextAreaContainer";
import "./App.scss";

const { ipcRenderer } = window.require("electron");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeydownEvents = this.handleKeydownEvents.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydownEvents);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydownEvents);
  }

  handleKeydownEvents(event) {
    if (event.metaKey || event.ctrlKey) {
      const { showToast } = this.props;

      if (event.key === ".") {
        ipcRenderer.send(TOGGLE_ALWAYS_ON_TOP);
        ipcRenderer.once(TOGGLE_ALWAYS_ON_TOP_RESPONSE, (_, payload) => {
          showToast(payload.message);
        });
      } else if (event.key === "s") {
        showToast("Your content is auto-saved!");
      } else if (event.key === "t") {
        // TODO
        // this.props.toggleColorTheme(!this.props.isDarkTheme)
      }
    }
  }

  render() {
    const { isDarkTheme, hasCustomTitleBar } = this.props;

    return (
      <ThemeWrapper theme={isDarkTheme ? Themes.Dark : Themes.Light}>
        <div className="working-area-container">
          <TabAreaContainer />
          <div className="right-pane-area-container">
            <TextAreaContainer />
          </div>
        </div>
        <ToastPopup />
        <TitleBar
          style={
            hasCustomTitleBar
              ? TitleBarStyles.WINDOWS_OR_LINUX
              : TitleBarStyles.MAC_OS
          }
        />
      </ThemeWrapper>
    );
  }
}

App.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  hasCustomTitleBar: PropTypes.bool.isRequired,
  showToast: PropTypes.func.isRequired,
  toggleColorTheme: PropTypes.func.isRequired,
};

export default App;
