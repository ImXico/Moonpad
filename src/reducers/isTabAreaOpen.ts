import { Actions } from "../actions";
import { ToggleOpenTabAreaAction } from "../actions/isTabAreaOpen";

export type TabAreaOpenState = boolean;

type TabAreaOpenAction = ToggleOpenTabAreaAction;

const defaultState: TabAreaOpenState = true;

const isTabAreaOpen = (
  state: TabAreaOpenState = defaultState,
  action: TabAreaOpenAction
) => {
  switch (action.type) {
    case Actions.ToggleOpenTabArea:
      return action.isNowOpen;
    default:
      return state;
  }
};

export default isTabAreaOpen;
