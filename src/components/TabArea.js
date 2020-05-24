import React from 'react';
import '../styles/app.scss';
import Tab from './Tab';
import NewTabButton from './NewTabButton';

const TabPaneVisibility = {
  Opening: "opening",
  Open: "open",
  Closing: "closing",
  Closed: "closed"
}

class TabArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibility: props.isOpen ? TabPaneVisibility.Open : TabPaneVisibility.Closed
    }
    this.onAnimationStart = this.onAnimationStart.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.handleOnCreateTab = this.handleOnCreateTab.bind(this);
    this.handleOnDeleteTab = this.handleOnDeleteTab.bind(this);
  }

  componentDidMount() {
    // TODO: Remove the listener on componentWillUnmount.
    window.addEventListener('keydown', event => {
      if (event.metaKey && event.key === 'e') {
        this.props.toggleOpenTabArea(!this.props.isOpen);
      }
    });
  }

  onAnimationStart(event) {
    const animationName = event.animationName;
    if (animationName === "TabsAreaOpening") {
      this.setState({ visibility: TabPaneVisibility.Opening })
    } else if (animationName === "TabsAreaClosing") {
      this.setState({ visibility: TabPaneVisibility.Closing })
    }
  }

  onAnimationEnd(event) {
    const animationName = event.animationName;
    if (animationName === "TabsAreaOpening") {
      this.setState({ visibility: TabPaneVisibility.Open })
    } else if (animationName === "TabsAreaClosing") {
      this.setState({ visibility: TabPaneVisibility.Closed })
    }
  }

  handleOnCreateTab(name) {
    const { tabs, createTab } = this.props;
    const newTabId = `${name}|${Date.now()}`;
    const newTabIndex = tabs.length + 1;
    createTab(newTabId, newTabIndex, name);
  }

  handleOnDeleteTab(id) {
    const { tabs, selectTab ,deleteTab } = this.props;
    const indexOfTabToDelete = tabs.find(tab => tab.id === id).index;
    const previousTab = tabs.find(tab => tab.index === indexOfTabToDelete - 1);
    selectTab(previousTab ? previousTab.id : null);
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
        <div className="TabsContainer">
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
          <NewTabButton onClick={() => this.handleOnCreateTab("NewSongBby")} />
          <div className="__tab-area-scroll-past" />
        </div>
      </div>
    );
  }
}

export default TabArea;
