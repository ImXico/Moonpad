import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { TitleBar } from "../TitleBar/TitleBar";
import TabAreaContainer from "../../containers/TabAreaContainer";
import TextAreaContainer from "../../containers/TextAreaContainer";
import ToastPopupContainer from "../../containers/ToastPopupContainer";
import { ConnectedProps, DispatchProps } from "../../containers/AppContainer";
import { IpcActions } from "../../shared/ipcActions";
import { RightPaneWrapper, WorkingAreaWrapper } from "./styled";
import { DarkTheme, LightTheme } from "../../themes";

const { ipcRenderer } = window.require("electron");

type Props = ConnectedProps &
  DispatchProps & {
    isMacOs: boolean;
  };

export function App({ isMacOs, isDarkTheme, showToast }: Props) {
  const handleKeydownEvents = React.useCallback((event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey) {
      if (event.key === ".") {
        ipcRenderer.send(IpcActions.ToggleAlwaysOnTopRequest);
        ipcRenderer.once(
          IpcActions.ToggleAlwaysOnTopResponse,
          (_: unknown, payload: { message: string }) => {
            showToast(payload.message);
          }
        );
      } else if (event.key === "s") {
        showToast("Your content is auto-saved!");
      } else if (event.key === "t") {
        // TODO
        // this.props.toggleColorTheme(!this.props.isDarkTheme)
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydownEvents);
    return () => {
      window.removeEventListener("keydown", handleKeydownEvents);
    };
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
      <WorkingAreaWrapper>
        <TabAreaContainer />
        <RightPaneWrapper>
          <TextAreaContainer />
        </RightPaneWrapper>
      </WorkingAreaWrapper>
      <ToastPopupContainer />
      <TitleBar isMacOs={isMacOs} />
    </ThemeProvider>
  );
}
