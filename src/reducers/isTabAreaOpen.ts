import { Actions } from "../actions";
import { ToggleOpenTabAreaAction } from "../actions/isTabAreaOpen";

type State = {
  isNowOpen: boolean;
};

type Action = ToggleOpenTabAreaAction;

const defaultState: State = {
  isNowOpen: true,
};

const isTabAreaOpen = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case Actions.ToggleOpenTabArea:
      return action.isNowOpen;
    default:
      return state;
  }
};

export default isTabAreaOpen;
