import React from 'react';
import Tab from '../Tab/Tab';
import NewTabButton from '../NewTabButton/NewTabButton';
import './TabArea.scss';

const TabPaneVisibility = {
  Opening: 'opening',
  Open: 'open',
  Closing: 'closing',
  Closed: 'closed'
}

class TabArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibility: props.isOpen ? TabPaneVisibility.Open : TabPaneVisibility.Closed
    }
    this.tabsContainerRef = React.createRef();
    this.onAnimationStart = this.onAnimationStart.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.handleOnCreateTab = this.handleOnCreateTab.bind(this);
    this.handleOnDeleteTab = this.handleOnDeleteTab.bind(this);
    this.handleKeydownEvents = this.handleKeydownEvents.bind(this);
    this.smoothScrollToNewlyCreatedTab = this.smoothScrollToNewlyCreatedTab.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownEvents);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownEvents);
  }

  handleKeydownEvents(event) {
    if (event.metaKey) {
      if (event.key === 'e') {
        this.props.toggleOpenTabArea(!this.props.isOpen);
      } else if (event.key === 'n') {
        this.handleOnCreateTab();
        this.smoothScrollToNewlyCreatedTab();
      }
    }
  }

  smoothScrollToNewlyCreatedTab() {
    const ref = this.tabsContainerRef.current;
    ref.scroll({
      top: ref.offsetHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  onAnimationStart(event) {
    const animationName = event.animationName;
    if (animationName === 'TabsAreaOpening') {
      this.setState({ visibility: TabPaneVisibility.Opening })
    } else if (animationName === 'TabsAreaClosing') {
      this.setState({ visibility: TabPaneVisibility.Closing })
    }
  }

  onAnimationEnd(event) {
    const animationName = event.animationName;
    if (animationName === 'TabsAreaOpening') {
      this.setState({ visibility: TabPaneVisibility.Open })
    } else if (animationName === 'TabsAreaClosing') {
      this.setState({ visibility: TabPaneVisibility.Closed })
    }
  }

  handleOnCreateTab() {
    const { tabs, createTab, selectTab } = this.props;
    const defaultNewTabName = 'New Tab';
    const newTabId = `${defaultNewTabName}|${Date.now()}`;
    const newTabIndex = tabs.length + 1;
    createTab(newTabId, newTabIndex, defaultNewTabName);
    selectTab(newTabId);
  }

  handleOnDeleteTab(id) {
    const { tabs, selectTab ,deleteTab } = this.props;
    const indexOfTabToDelete = tabs.find(tab => tab.id === id).index;
    
    const nextAndPreviousTabs = tabs
      .filter(tab => Math.abs(indexOfTabToDelete - tab.index) === 1)
      .sort((a, b) => b.index - a.index);
    
    selectTab(nextAndPreviousTabs.length > 0 ? nextAndPreviousTabs[0].id : null);
    deleteTab(id);
  }

  render() {
    const {
      tabs,
      isOpen,
      currentlySelectedTab,
      selectTab,
      updateTabName,
      canTabBeMovedUp,
      canTabBeMovedDown,
      moveTabUp,
      moveTabDown
    } = this.props;

    return (
      <div
        className={`TabsPane TabsPane--${isOpen ? 'open' : 'closed'}`}
        onAnimationStart={event => this.onAnimationStart(event)}
        onAnimationEnd={event => this.onAnimationEnd(event)}
      >
        <div
          className="TabsContainer"
          ref={this.tabsContainerRef}
        >
          {tabs
            .sort((a, b) => a.index - b.index)
            .map(tab => 
              <Tab
                {...tab}
                key={tab.id}
                visibility={this.state.visibility}
                isSelected={tab.id === currentlySelectedTab}
                canTabBeMovedUp={canTabBeMovedUp}
                canTabBeMovedDown={canTabBeMovedDown}
                onUpdateTabName={updateTabName}
                onDelete={this.handleOnDeleteTab}
                onSelect={selectTab}
                onMoveTabUp={moveTabUp}
                onMoveTabDown={moveTabDown}
              />
          )}
          <NewTabButton onClick={this.handleOnCreateTab} />
          <div className="__tab-area-scroll-past" />
        </div>
      </div>
    );
  }
}

export default TabArea;
