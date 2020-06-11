import React from 'react';
import './TitleBar.scss';

const { MINIMIZE_WINDOW, TOGGLE_MAXIMIZE_WINDOW, CLOSE_WINDOW } = require('../../data/ipcActions');
const { ipcRenderer } = window.require('electron');

export const TitleBarStyles = {
  MAC_OS: 0,
  WINDOWS_OR_LINUX: 1
}

const MacOSTitleBar = () => (
  <div className="title-bar title-bar-mac" />
);

const WindowsOrLinuxTitleBar = () => (
  <div className="title-bar title-bar-non-mac">
    <div className="window-buttons-container">
      <button
        className="window-button"
        onClick={() => ipcRenderer.send(MINIMIZE_WINDOW)}>
          -
      </button>
      <button
        className="window-button"
        onClick={() => ipcRenderer.send(TOGGLE_MAXIMIZE_WINDOW)}>
          □
      </button>
      <button
        className="window-button"
        onClick={() => ipcRenderer.send(CLOSE_WINDOW)}>
          ×
      </button>
    </div>
  </div>
);

const TitleBar = ({ style }) => (
  style === TitleBarStyles.MAC_OS
    ? <MacOSTitleBar />
    : <WindowsOrLinuxTitleBar />
);

export default TitleBar;
