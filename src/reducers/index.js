import { combineReducers } from 'redux';
import tabs from './tabs';
import toastPopup from './toastPopup';
import selectedTab from './selectedTab';
import isDarkTheme from './isDarkTheme';
import isTabAreaOpen from './isTabAreaOpen';

/*------------------------------------------------------------
tabs: [
  { id: string, name: string, index: number, content: string },
  ...
],
selectedTab: some id,
isTabAreaOpen: bool,
isDarkTheme: bool,
toastPopup: {
  showing: bool,
  message: string
}
------------------------------------------------------------*/

export default combineReducers({
  tabs,
  toastPopup,
  isDarkTheme,
  selectedTab,
  isTabAreaOpen,
});
