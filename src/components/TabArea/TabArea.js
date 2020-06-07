import React from 'react';
import Tab from '../Tab/Tab';
import NewTabButton from '../NewTabButton/NewTabButton';
import PropTypes from 'prop-types';
import './TabArea.scss';

class TabArea extends React.Component {

  constructor(props) {
    super(props);
    this.tabsContainerRef = React.createRef();
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

  handleOnCreateTab() {
    const { tabs, createTab, selectTab } = this.props;
    const defaultNewTabName = 'New Tab';
    const newTabId = `${defaultNewTabName}|${Date.now()}`;
    const newTabIndex = tabs.length + 1;
    createTab(newTabId, newTabIndex, defaultNewTabName);
    selectTab(newTabId);
  }

  handleOnDeleteTab(id) {
    const { tabs, selectTab, deleteTab } = this.props;
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
      <div className={`TabsPane ${isOpen && 'open'}`}>
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

TabArea.propTypes = {
  tabs: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  currentlySelectedTab: PropTypes.string.isRequired,
  selectTab: PropTypes.func.isRequired,
  updateTabName: PropTypes.func.isRequired,
  canTabBeMovedUp: PropTypes.func.isRequired,
  canTabBeMovedDown: PropTypes.func.isRequired,
  moveTabUp: PropTypes.func.isRequired,
  moveTabDown: PropTypes.func.isRequired
}

export default TabArea;
