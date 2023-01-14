import { connect } from "react-redux";
import { selectTabAndPersist } from "../actions/selectedTab";
import { toggleOpenTabAreaAndPersist } from "../actions/isTabAreaOpen";
import {
  createTabAndPersist,
  moveTabUpAndPersist,
  moveTabDownAndPersist,
  deleteTabAndPersist,
  updateTabNameAndPersist,
} from "../actions/tabs";
import TabArea from "../components/TabArea/TabArea";

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs,
    isOpen: state.isTabAreaOpen,
    currentlySelectedTab: state.selectedTab,
    canTabBeMovedUp: (index) => index > 1,
    canTabBeMovedDown: (index) => index < state.tabs.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTab: (id, index, name) =>
      dispatch(createTabAndPersist(id, index, name)),
    selectTab: (id) => dispatch(selectTabAndPersist(id)),
    moveTabUp: (id) => dispatch(moveTabUpAndPersist(id)),
    deleteTab: (id, name) => dispatch(deleteTabAndPersist(id, name)),
    moveTabDown: (id) => dispatch(moveTabDownAndPersist(id)),
    updateTabName: (id, newName) =>
      dispatch(updateTabNameAndPersist(id, newName)),
    toggleOpenTabArea: (isNowOpen) =>
      dispatch(toggleOpenTabAreaAndPersist(isNowOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabArea);
