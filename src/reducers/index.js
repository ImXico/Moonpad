import { combineReducers } from 'redux';
import tabs from './tabs';
import selectedTab from './selectedTab';
import isTabAreaOpen from './isTabAreaOpen';

/*------------------------------------------------------------
tabs: [
  { id: string, name: string, index: number, content: string },
  ...
],
selectedTab: some id,
isTabAreaOpen: bool,
------------------------------------------------------------*/

export default combineReducers({
  tabs,
  selectedTab,
  isTabAreaOpen,
});
