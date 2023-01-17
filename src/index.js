import React from "react";
import { createRoot } from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import * as ipcActions from "./data/ipcActions";
import * as serviceWorker from "./serviceWorker";
import AppContainer from "./containers/AppContainer";

import "./reset.scss";

const { ipcRenderer } = window.require("electron");

/**
 * Set the initial state based on what we have on our local database.
 * This request needs to be done synchronously, and the ipcMain will
 * only listen to it once (and unregister after that).
 */
const persistedInitialState = ipcRenderer.sendSync(
  ipcActions.LOAD_PERSISTED_DATA
);

/**
 * Check if the app is running in macOS.
 * This is necessary to determine whether or not we need to render a custom
 * titlebar (that is, if *not* on macOS).
 */
const isMacOS = ipcRenderer.sendSync(ipcActions.CHECK_IF_MACOS);

const store = createStore(
  rootReducer,
  persistedInitialState,
  applyMiddleware(thunk, createLogger())
);

createRoot(document.getElementById("root")).render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <AppContainer hasCustomTitleBar={!isMacOS} />
  </Provider>
);

serviceWorker.unregister();
