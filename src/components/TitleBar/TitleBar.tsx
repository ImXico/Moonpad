import React from "react";
import { IpcActions } from "../../shared/ipcActions";
import {
  TitleBarLinuxWindowsWrapper,
  TitleBarMacOS,
  WindowButton,
  WindowButtonsContainer,
} from "./styled";

const { ipcRenderer } = window.require("electron");

const MINIMIZE_WINDOW_BUTTON_SYMBOL = "-";
const MAXIMIZE_WINDOW_BUTTON_SYMBOL = "□";
const CLOSE_WINDOW_BUTTON_SYMBOL = "×";

type Props = {
  isMacOs: boolean;
};

export function TitleBar({ isMacOs }: Props) {
  if (isMacOs) {
    return <TitleBarMacOS />;
  }

  return (
    <TitleBarLinuxWindowsWrapper>
      <WindowButtonsContainer>
        <WindowButton
          type="button"
          onClick={() => ipcRenderer.send(IpcActions.MinimizeWindow)}
        >
          {MINIMIZE_WINDOW_BUTTON_SYMBOL}
        </WindowButton>
        <WindowButton
          type="button"
          onClick={() => ipcRenderer.send(IpcActions.ToggleMaximizeWindow)}
        >
          {MAXIMIZE_WINDOW_BUTTON_SYMBOL}
        </WindowButton>
        <WindowButton
          type="button"
          onClick={() => ipcRenderer.send(IpcActions.CloseWindow)}
        >
          {CLOSE_WINDOW_BUTTON_SYMBOL}
        </WindowButton>
      </WindowButtonsContainer>
    </TitleBarLinuxWindowsWrapper>
  );
}
