import { combineReducers } from "redux";
import tabs, { TabsState } from "./tabs";
import toastPopup, { ToastPopupState } from "./toastPopup";
import selectedTab, { SelectedTabState } from "./selectedTab";
import isDarkTheme, { ThemeState } from "./isDarkTheme";
import isTabAreaOpen, { TabAreaOpenState } from "./isTabAreaOpen";

export type State = {
  tabs: TabsState;
  toastPopup: ToastPopupState;
  selectedTab: SelectedTabState;
  isDarkTheme: ThemeState;
  isTabAreaOpen: TabAreaOpenState;
};

export const reducer = combineReducers({
  tabs,
  toastPopup,
  isDarkTheme,
  selectedTab,
  isTabAreaOpen,
});
