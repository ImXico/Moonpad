import React, { useCallback, useEffect, useRef } from "react";
import { Tab } from "../Tab/Tab";
import { NewTabButton } from "../NewTabButton/NewTabButton";
import {
  ConnectedProps,
  DispatchProps,
} from "../../containers/TabAreaContainer";
import { ScrollPast, TabAreaWrapper, TabsWrapper } from "./styled";

const DEFAULT_NEW_TAB_NAME = "New Tab";

type Props = ConnectedProps & DispatchProps;

export function TabArea({
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
}: Props) {
  const tabsWrapperRef = useRef<HTMLDivElement>(null);

  const handleCreateTab = () => {
    const newTabId = `${DEFAULT_NEW_TAB_NAME}|${Date.now()}`;
    const newTabIndex = tabs.length + 1;
    createTab(newTabId, newTabIndex, DEFAULT_NEW_TAB_NAME);
    selectTab(newTabId);
  };

  const smoothScrollToNewlyCreatedTab = () => {
    const refCurrent = tabsWrapperRef.current;
    if (refCurrent) {
      refCurrent.scroll({
        top: refCurrent.offsetHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.key === "e") {
          toggleOpenTabArea(!isOpen);
        } else if (event.key === "n") {
          handleCreateTab();
          smoothScrollToNewlyCreatedTab();
        }
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleDeleteTab = (id: string, name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const indexOfTabToDelete = tabs.find((tab) => tab.id === id)!.index;

    const nextAndPreviousTabs = tabs
      .filter((tab) => Math.abs(indexOfTabToDelete - tab.index) === 1)
      .sort((a, b) => b.index - a.index);

    selectTab(
      nextAndPreviousTabs.length > 0 ? nextAndPreviousTabs[0].id : null
    );

    deleteTab(id, name);
  };

  return (
    <TabAreaWrapper isTabAreaOpen={isOpen}>
      <TabsWrapper ref={tabsWrapperRef}>
        {tabs
          .sort((a, b) => a.index - b.index)
          .map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              index={tab.index}
              isSelected={tab.id === currentlySelectedTab}
              name={tab.name}
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
        <ScrollPast />
      </TabsWrapper>
    </TabAreaWrapper>
  );
}
