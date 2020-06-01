import { combineReducers } from 'redux';
import tabs from './tabs';
import selectedTab from './selectedTab';
import isTabAreaOpen from './isTabAreaOpen';
import isAlwaysOnTop from './isAlwaysOnTop';

/*------------------------------------------------------------
tabs: [
  { id: string, name: string, index: number, content: string },
  ...
],
selectedTab: some id,
isTabAreaOpen: bool,
isAlwaysOnTop: bool
------------------------------------------------------------*/

export default combineReducers({
  tabs,
  selectedTab,
  isTabAreaOpen,
  isAlwaysOnTop
});
