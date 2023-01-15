import React from "react";
import PropTypes from "prop-types";
import "./TitleBar.scss";

const {
  MINIMIZE_WINDOW,
  TOGGLE_MAXIMIZE_WINDOW,
  CLOSE_WINDOW,
} = require("../../data/ipcActions");

const { ipcRenderer } = window.require("electron");

export const TitleBarStyles = {
  MAC_OS: 0,
  WINDOWS_OR_LINUX: 1,
};

function MacOSTitleBar() {
  return <div className="title-bar title-bar-mac" />;
}

function WindowsOrLinuxTitleBar() {
  return (
    <div className="title-bar title-bar-non-mac">
      <div className="window-buttons-container">
        <button
          type="button"
          className="window-button"
          onClick={() => ipcRenderer.send(MINIMIZE_WINDOW)}
        >
          -
        </button>
        <button
          type="button"
          className="window-button"
          onClick={() => ipcRenderer.send(TOGGLE_MAXIMIZE_WINDOW)}
        >
          □
        </button>
        <button
          type="button"
          className="window-button"
          onClick={() => ipcRenderer.send(CLOSE_WINDOW)}
        >
          ×
        </button>
      </div>
    </div>
  );
}

function TitleBar({ style }) {
  return style === TitleBarStyles.MAC_OS ? (
    <MacOSTitleBar />
  ) : (
    <WindowsOrLinuxTitleBar />
  );
}

TitleBar.propTypes = {
  style: PropTypes.number.isRequired,
};

export default TitleBar;
