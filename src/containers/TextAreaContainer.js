import { connect } from "react-redux";
import { updateTabContentAndPersist } from "../actions/tabs";
import TextArea from "../components/TextArea/TextArea";

const mapStateToProps = (state) => {
  const { tabs, selectedTab } = state;

  return {
    currentlyActiveTab: selectedTab,
    currentTabContent:
      selectedTab !== null
        ? tabs.find((tab) => tab.id === selectedTab).content
        : "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTabContent: (id, newContent) =>
      dispatch(updateTabContentAndPersist(id, newContent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
