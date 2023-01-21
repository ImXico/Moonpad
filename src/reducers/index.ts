import { combineReducers } from "redux";
import tabs from "./tabs";
import toastPopup from "./toastPopup";
import selectedTab from "./selectedTab";
import isDarkTheme from "./isDarkTheme";
import isTabAreaOpen from "./isTabAreaOpen";

export const reducer = combineReducers({
  tabs,
  toastPopup,
  isDarkTheme,
  selectedTab,
  isTabAreaOpen,
});
