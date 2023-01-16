import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Tab from "../Tab/Tab";
import NewTabButton from "../NewTabButton/NewTabButton";
import "./TabArea.scss";

const DEFAULT_NEW_TAB_NAME = "New Tab";

function TabArea({
  tabs,
  isOpen,
  currentlySelectedTab,
  selectTab,
  updateTabName,
  canTabBeMovedUp,
  canTabBeMovedDown,
  moveTabUp,
  moveTabDown,
  toggleOpenTabArea,
  createTab,
  deleteTab,
}) {
  const tabsContainerRef = useRef(null);

  const handleCreateTab = () => {
    const newTabId = `${DEFAULT_NEW_TAB_NAME}|${Date.now()}`;
    const newTabIndex = tabs.length + 1;
    createTab(newTabId, newTabIndex, DEFAULT_NEW_TAB_NAME);
    selectTab(newTabId);
  };

  const smoothScrollToNewlyCreatedTab = () => {
    const refCurrent = tabsContainerRef.current;
    refCurrent.scroll({
      top: refCurrent.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (event) => {
    if (event.metaKey || event.ctrlKey) {
      if (event.key === "e") {
        toggleOpenTabArea(!isOpen);
      } else if (event.key === "n") {
        handleCreateTab();
        smoothScrollToNewlyCreatedTab();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDeleteTab = (id, name) => {
    const indexOfTabToDelete = tabs.find((tab) => tab.id === id).index;

    const nextAndPreviousTabs = tabs
      .filter((tab) => Math.abs(indexOfTabToDelete - tab.index) === 1)
      .sort((a, b) => b.index - a.index);

    selectTab(
      nextAndPreviousTabs.length > 0 ? nextAndPreviousTabs[0].id : null
    );

    deleteTab(id, name);
  };

  return (
    <div className={`TabsPane ${isOpen && "open"}`}>
      <div className="TabsContainer" ref={tabsContainerRef}>
        {tabs
          .sort((a, b) => a.index - b.index)
          .map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              index={tab.index}
              isSelected={tab.id === currentlySelectedTab}
              canTabBeMovedUp={canTabBeMovedUp}
              canTabBeMovedDown={canTabBeMovedDown}
              onUpdateTabName={updateTabName}
              onDelete={handleDeleteTab}
              onSelect={selectTab}
              onMoveTabUp={moveTabUp}
              onMoveTabDown={moveTabDown}
            />
          ))}
        <NewTabButton isVisible={isOpen} onClick={handleCreateTab} />
        <div className="tab-area-scroll-past" />
      </div>
    </div>
  );
}

TabArea.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tabs: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  currentlySelectedTab: PropTypes.string.isRequired,
  selectTab: PropTypes.func.isRequired,
  updateTabName: PropTypes.func.isRequired,
  canTabBeMovedUp: PropTypes.func.isRequired,
  canTabBeMovedDown: PropTypes.func.isRequired,
  moveTabUp: PropTypes.func.isRequired,
  moveTabDown: PropTypes.func.isRequired,
  toggleOpenTabArea: PropTypes.func.isRequired,
  createTab: PropTypes.func.isRequired,
  deleteTab: PropTypes.func.isRequired,
};

export default TabArea;
