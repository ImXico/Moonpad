import {
  RECEIVE_UPDATED_TABS,
  CREATE_TAB,
  DELETE_TAB,
  UPDATE_TAB_NAME,
  SWAP_TABS,
  UPDATE_TAB_CONTENT,
} from '../actions/tabs';

const tabs = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_UPDATED_TABS:
      return [...action.tabs];

    case CREATE_TAB:
      return [...state, {...action.newTab}];

    case UPDATE_TAB_NAME:
      return state.map(tab => tab.id === action.id ? {...tab, name: action.newName} : tab);

    case UPDATE_TAB_CONTENT:
      return state.map(tab => tab.id === action.id ? {...tab, content: action.newContent} : tab);

    case SWAP_TABS:
      const indexOfTab1 = state.find(tab => tab.id === action.id).index;
      const indexOfTab2 = action.isMovingUp ? indexOfTab1 - 1 : indexOfTab1 + 1;
      const idOfTab2 = state.find(tab => tab.index === indexOfTab2).id;
      return state.map(tab => {
        if (tab.id === action.id) return {...tab, index: indexOfTab2 }
        if (tab.id === idOfTab2)  return {...tab, index: indexOfTab1 }
        return tab;
      });

    case DELETE_TAB:
      const indexOfDeletedTab = state.find(tab => tab.id === action.id).index;
      return state
        .filter(tab => tab.id !== action.id)
        .map(tab => tab.index > indexOfDeletedTab ? {...tab, index: tab.index - 1} : tab);

    default:
      return state;
  }
}

export default tabs;
