import { Actions } from "../actions";
import {
  CreateTabAction,
  DeleteTabAction,
  SwapTabsAction,
  UpdateTabContentAction,
  UpdateTabNameAction,
} from "../actions/tabs";

type Tab = {
  id: string;
  name: string;
  index: number;
  content: string;
};

export type TabsState = Tab[];

type TabsAction =
  | CreateTabAction
  | UpdateTabNameAction
  | UpdateTabContentAction
  | SwapTabsAction
  | DeleteTabAction;

const defaultState: TabsState = [];

const tabs = (state: TabsState = defaultState, action: TabsAction) => {
  switch (action.type) {
    case Actions.CreateTab:
      return [...state, { ...action.newTab }];

    case Actions.UpdateTabName:
      return state.map((tab) =>
        tab.id === action.id ? { ...tab, name: action.newName } : tab
      );

    case Actions.UpdateTabContent:
      return state.map((tab) =>
        tab.id === action.id ? { ...tab, content: action.newContent } : tab
      );

    case Actions.SwapTabs: {
      const indexOfTab1 = state.find((tab) => tab.id === action.id)!.index;
      const indexOfTab2 = action.isMovingUp ? indexOfTab1 - 1 : indexOfTab1 + 1;
      const idOfTab2 = state.find((tab) => tab.index === indexOfTab2)!.id;
      return state.map((tab) => {
        if (tab.id === action.id) return { ...tab, index: indexOfTab2 };
        if (tab.id === idOfTab2) return { ...tab, index: indexOfTab1 };
        return tab;
      });
    }

    case Actions.DeleteTab: {
      const indexOfDeletedTab = state.find(
        (tab) => tab.id === action.id
      )!.index;
      return state
        .filter((tab) => tab.id !== action.id)
        .map((tab) =>
          tab.index > indexOfDeletedTab ? { ...tab, index: tab.index - 1 } : tab
        );
    }

    default:
      return state;
  }
};

export default tabs;
