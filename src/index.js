import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import * as ipcActions from './data/ipcActions';
import * as serviceWorker from './serviceWorker';
import './reset.scss';
import App from './components/App/App';

const { ipcRenderer } = window.require('electron');

/**
 * Set the initial state based on what we have on our local database.
 * This request needs to be done synchronously, and the ipcMain will
 * only listen to it once (and unregister after that).
 */
const persistedInitialState = ipcRenderer.sendSync(ipcActions.LOAD_PERSISTED_DATA);

const store = createStore(
  rootReducer,
  persistedInitialState,
  applyMiddleware(thunk, createLogger())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
