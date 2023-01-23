import { Actions } from "../actions";
import { SelectTabAction } from "../actions/selectedTab";

export type SelectedTabState = string | null;

type SelectedTabAction = SelectTabAction;

const defaultState: SelectedTabState = null;

const selectedTab = (
  state: SelectedTabState = defaultState,
  action: SelectedTabAction
) => {
  switch (action.type) {
    case Actions.SelectTab:
      return action.tabId;
    default:
      return state;
  }
};

export default selectedTab;
