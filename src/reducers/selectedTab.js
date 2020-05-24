import { SELECT_TAB } from '../actions/selectedTab';

const selectedTab = (state = null, action) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tabId;
    default:
      return state;
  }
}

export default selectedTab;
