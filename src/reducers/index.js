import { combineReducers } from 'redux';
import tabs from './tabs';
import selectedTab from './selectedTab';
import isTabAreaOpen from './isTabAreaOpen';
import windowSettings from './windowSettings';

/*------------------------------------------------------------
tabs: [
  { id: string, name: string, index: number, content: string },
  ...
],
selectedTab: some id,
isTabAreaOpen: bool,
windowSettings: {
  isAlwaysOnTop: bool,
  width: number
  height: number
}
------------------------------------------------------------*/

export default combineReducers({
  tabs,
  selectedTab,
  isTabAreaOpen,
  windowSettings
});
