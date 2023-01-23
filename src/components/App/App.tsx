import React, { useEffect } from "react";
import { ThemeWrapper, Themes } from "../ThemeWrapper/ThemeWrapper";
import { TitleBar, TitleBarStyles } from "../TitleBar/TitleBar";
import TabAreaContainer from "../../containers/TabAreaContainer";
import TextAreaContainer from "../../containers/TextAreaContainer";
import ToastPopupContainer from "../../containers/ToastPopupContainer";
import { ConnectedProps, DispatchProps } from "../../containers/AppContainer";
import { IpcActions } from "../../data/ipcActions";
import "./App.scss";

const { ipcRenderer } = window.require("electron");

type Props = ConnectedProps &
  DispatchProps & {
    hasCustomTitleBar: boolean;
  };

export function App({ hasCustomTitleBar, isDarkTheme, showToast }: Props) {
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
    <ThemeWrapper theme={isDarkTheme ? Themes.Dark : Themes.Light}>
      <div className="working-area-container">
        <TabAreaContainer />
        <div className="right-pane-area-container">
          <TextAreaContainer />
        </div>
      </div>
      <ToastPopupContainer />
      <TitleBar
        barStyle={
          hasCustomTitleBar
            ? TitleBarStyles.WindowsOrLinux
            : TitleBarStyles.MacOs
        }
      />
    </ThemeWrapper>
  );
}
