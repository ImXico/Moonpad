import React from "react";
import PropTypes from "prop-types";
import { IpcActions } from "../../data/ipcActions";
import "./TitleBar.scss";

const { ipcRenderer } = window.require("electron");

export const enum TitleBarStyles {
  MacOs,
  WindowsOrLinux,
}

type TitleBarProps = {
  style: TitleBarStyles;
};

export function TitleBar({ style }: TitleBarProps) {
  if (style === TitleBarStyles.MacOs) {
    return <div className="title-bar title-bar-mac" />;
  }

  return (
    <div className="title-bar title-bar-non-mac">
      <div className="window-buttons-container">
        <button
          type="button"
          className="window-button"
          onClick={() => ipcRenderer.send(IpcActions.MinimizeWindow)}
        >
          -
        </button>
        <button
          type="button"
          className="window-button"
          onClick={() => ipcRenderer.send(IpcActions.ToggleMaximizeWindow)}
        >
          □
        </button>
        <button
          type="button"
          className="window-button"
          onClick={() => ipcRenderer.send(IpcActions.CloseWindow)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
