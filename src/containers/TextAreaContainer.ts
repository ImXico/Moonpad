import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { updateTabContentAndPersist } from "../actions/tabs";
import { TextArea } from "../components/TextArea/TextArea";
import { State } from "../reducers";
import { SelectedTabState } from "../reducers/selectedTab";

export type ConnectedProps = {
  currentlyActiveTab: SelectedTabState;
  currentTabContent: string;
};

export type DispatchProps = {
  updateTabContent: (id: string, newContent: string) => void;
};

const mapStateToProps = (state: State): ConnectedProps => {
  const { tabs, selectedTab } = state;

  return {
    currentlyActiveTab: selectedTab,
    currentTabContent:
      selectedTab !== null
        ? tabs.find((tab) => tab.id === selectedTab)!.content
        : "",
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<State, {}, Action>
): DispatchProps => ({
  updateTabContent: (id: string, newContent: string) =>
    dispatch(updateTabContentAndPersist(id, newContent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
