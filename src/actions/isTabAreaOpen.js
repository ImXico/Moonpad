import * as ipcActions from '../data/ipc-actions';
const { ipcRenderer } = window.require('electron');

export const TOGGLE_OPEN_TAB_AREA = 'TOGGLE_OPEN_TAB_AREA';

const toggleOpenTabArea = isNowOpen => {
  return {
    type: TOGGLE_OPEN_TAB_AREA,
    isNowOpen: isNowOpen
  }
}

export const toggleOpenTabAreaAndPersist = isNowOpen => {
  return dispatch => {
    dispatch(toggleOpenTabArea(isNowOpen));
    ipcRenderer.send(ipcActions.TOGGLE_OPEN_TAB_AREA);
  }
}