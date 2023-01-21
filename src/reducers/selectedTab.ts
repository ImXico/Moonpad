import { Actions } from "../actions";
import { SelectTabAction } from "../actions/selectedTab";

type State = {
  selectedTabId: string | null;
};

type Action = SelectTabAction;

const defaultState = {
  selectedTabId: null,
};

const selectedTab = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case Actions.SelectTab:
      return action.tabId;
    default:
      return state;
  }
};

export default selectedTab;
