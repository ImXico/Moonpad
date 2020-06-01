import * as ipcActions from '../data/ipcActions';
const { ipcRenderer } = window.require('electron');

export const TOGGLE_ALWAYS_ON_TOP = 'TOGGLE_ALWAYS_ON_TOP';

const toggleAlwaysOnTop = isNowAlwaysOnTop => {
  return {
    type: TOGGLE_ALWAYS_ON_TOP,
    isNowAlwaysOnTop
  }
}

export const toggleAlwaysOnTopAndPersist = isNowAlwaysOnTop => {
  return dispatch => {
    dispatch(toggleAlwaysOnTop(isNowAlwaysOnTop));
    ipcRenderer.send(ipcActions.TOGGLE_ALWAYS_ON_TOP); 
  }
}
