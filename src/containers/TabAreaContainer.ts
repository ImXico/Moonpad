import { connect } from "react-redux";
import { selectTabAndPersist } from "../actions/selectedTab";
import {
  ToggleOpenTabAreaAction,
  toggleOpenTabAreaAndPersist,
} from "../actions/isTabAreaOpen";
import {
  createTabAndPersist,
  moveTabUpAndPersist,
  moveTabDownAndPersist,
  deleteTabAndPersist,
  updateTabNameAndPersist,
  UpdateTabNameAction,
  CreateTabAction,
  UpdateTabContentAction,
  SwapTabsAction,
  DeleteTabAction,
} from "../actions/tabs";
import TabArea from "../components/TabArea/TabArea";
import { TabsState } from "../reducers/tabs";
import { TabAreaOpenState } from "../reducers/isTabAreaOpen";
import { SelectedTabState } from "../reducers/selectedTab";
import { State } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { ShowToastPopupAction } from "../actions/toastPopup";

export type ConnectedProps = {
  tabs: TabsState;
  isOpen: TabAreaOpenState;
  currentlySelectedTab: SelectedTabState;
  canTabBeMovedUp: (index: number) => boolean;
  canTabBeMovedDown: (index: number) => boolean;
};

export type DispatchProps = {
  createTab: (id: string, index: number, name: string) => void;
  selectTab: (id: string) => void;
  moveTabUp: (id: string) => void;
  deleteTab: (id: string, name: string) => void;
  moveTabDown: (id: string) => void;
  updateTabName: (id: string, newName: string) => void;
  toggleOpenTabArea: (isNowOpen: boolean) => void;
};

type DispatchableActions =
  | CreateTabAction
  | UpdateTabNameAction
  | UpdateTabContentAction
  | SwapTabsAction
  | DeleteTabAction
  | ToggleOpenTabAreaAction
  | ShowToastPopupAction;

const mapStateToProps = (state: State): ConnectedProps => ({
  tabs: state.tabs,
  isOpen: state.isTabAreaOpen,
  currentlySelectedTab: state.selectedTab,
  canTabBeMovedUp: (index: number) => index > 1,
  canTabBeMovedDown: (index: number) => index < state.tabs.length,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, {}, DispatchableActions>
): DispatchProps => ({
  createTab: (id: string, index: number, name: string) =>
    dispatch(createTabAndPersist(id, index, name)),
  selectTab: (id: string) => dispatch(selectTabAndPersist(id)),
  moveTabUp: (id: string) => dispatch(moveTabUpAndPersist(id)),
  deleteTab: (id: string, name: string) =>
    dispatch(deleteTabAndPersist(id, name)),
  moveTabDown: (id: string) => dispatch(moveTabDownAndPersist(id)),
  updateTabName: (id: string, newName: string) =>
    dispatch(updateTabNameAndPersist(id, newName)),
  toggleOpenTabArea: (isNowOpen: boolean) =>
    dispatch(toggleOpenTabAreaAndPersist(isNowOpen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabArea);
