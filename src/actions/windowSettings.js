import * as ipcActions from '../data/ipcActions';
const { ipcRenderer } = window.require('electron');

export const TOGGLE_ALWAYS_ON_TOP = 'TOGGLE_ALWAYS_ON_TOP';
export const UPDATE_WINDOW_DIMENSIONS = 'UPDATE_WINDOW_DIMENSIONS';

const toggleAlwaysOnTop = isNowAlwaysOnTop => {
  return {
    type: TOGGLE_ALWAYS_ON_TOP,
    isNowAlwaysOnTop
  }
}

const updateWindowDimensions = (newWidth, newHeight) => {
  return {
    type: UPDATE_WINDOW_DIMENSIONS,
    newWidth,
    newHeight
  }
}

export const toggleAlwaysOnTopAndPersist = isNowAlwaysOnTop => {
  return dispatch => {
    dispatch(toggleAlwaysOnTop(isNowAlwaysOnTop));
    ipcRenderer.send(ipcActions.TOGGLE_ALWAYS_ON_TOP); 
  }
}

export const persistNewWindowDimensions = (newWidth, newHeight) => {
  return dispatch => {
    dispatch(updateWindowDimensions(newWidth, newHeight));
    ipcRenderer.send(ipcActions.UPDATE_WINDOW_DIMENSIONS);
  }
}
