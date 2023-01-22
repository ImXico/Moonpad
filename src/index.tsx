import * as React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { reducer as rootReducer } from "./reducers/index";
import * as serviceWorker from "./serviceWorker";
import AppContainer from "./containers/AppContainer";
import { IpcActions } from "./data/ipcActions";
import "./reset.scss";

const { ipcRenderer } = window.require("electron");

/**
 * Set the initial state based on what we have on our local database.
 * This request needs to be done synchronously, and the ipcMain will
 * only listen to it once (and unregister after that).
 */
const persistedInitialState = ipcRenderer.sendSync(
  IpcActions.LoadPersistedData
);

/**
 * Check if the app is running in macOS.
 * This is necessary to determine whether or not we need to render a custom
 * titlebar (that is, if *not* on macOS).
 */
const isMacOS = ipcRenderer.sendSync(IpcActions.CheckIfMacOs);

const store = createStore(
  rootReducer,
  persistedInitialState,
  applyMiddleware(thunk, createLogger())
);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <AppContainer hasCustomTitleBar={!isMacOS} />
  </Provider>
);

serviceWorker.unregister();
