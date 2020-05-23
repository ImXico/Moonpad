import React from 'react';
import '../styles/app.scss';
import BottomPane from './BottomPane';
import TabArea from './TabArea';
import TextArea from './TextArea';
import {
  LOAD_ALL_TABS,
  TABS_REFRESHED,
  CREATE_TAB
} from '../data/ipc-actions';

const { ipcRenderer } = window.require('electron');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: undefined,
      currentlyActiveTab: undefined,
      isTabAreaOpen: true
    }
    this.setupIPC = this.setupIPC.bind(this);
    this.onTabSelected = this.onTabSelected.bind(this);
    this.onCreateNewTabClicked = this.onCreateNewTabClicked.bind(this);
  }

  componentDidMount() {
    this.setupIPC();
    this.loadAllTabsAndContent();
    this.registerKeyboardEventsListener();
  }

  setupIPC() {
    ipcRenderer.on(TABS_REFRESHED, (_, tabsArray) => {
      this.setState(prevState => {
        return {
          tabs: [...tabsArray],
          currentlyActiveTab: prevState.currentlyActiveTab === undefined
            ? {...tabsArray[0]}
            : prevState.currentlyActiveTab
        }
      })
    });
  }

  loadAllTabsAndContent() {
    ipcRenderer.send(LOAD_ALL_TABS);
  }

  registerKeyboardEventsListener() {
    // TODO: Remove the listener on componentWillUnmount.
    window.addEventListener('keydown', (event) => {
      if (event.metaKey && event.key === 'e') {
        this.setState(prevState => {
          return { isTabAreaOpen: !prevState.isTabAreaOpen };
        });
      }
    });
  }

  onTabSelected(tabIndex) {
    if (tabIndex !== this.state.currentlyActiveTab.tabIndex) {
      const newSelectedTab = this.state.tabs.find(tab => tab.index === tabIndex);
      if (newSelectedTab !== undefined) {
        this.setState({ currentlyActiveTab: newSelectedTab });
        // Refresh the "all content" data here to prevent any flicks when 
        // switching to some other tab in the future.
        this.loadAllTabsAndContent(); 
      }
    }
  }

  onCreateNewTabClicked() {
    const index = this.state.tabs.length;
    const name = `Tab${Math.floor(Math.random(1000))}`;
    const newTab = { index, name, content: "" };
    ipcRenderer.send(CREATE_TAB, { index, name });

    this.setState(prevState => {
      return {
        tabs: [...prevState.tabs, newTab],
        currentlyActiveTab: newTab
      }
    });
  }

  render() {
    const { isTabAreaOpen, tabs, currentlyActiveTab } = this.state;
    return (tabs !== undefined) && (
      <>
        <div className="__title-bar"></div>
        <div className="__working-area-container">
          <TabArea
            isOpen={isTabAreaOpen}
            tabs={tabs.map(tab => {
              return {
                index: tab.index,
                name: tab.name
              }
            })}
            currentlySelectedTab={currentlyActiveTab}
            onTabSelected={this.onTabSelected}
            onCreateNewTabClicked={this.onCreateNewTabClicked}
          />
          <div className="__right-pane-area-container">
            <TextArea
              activeTabName={currentlyActiveTab.name}
              activeTabContent={currentlyActiveTab.content}
            />
            <BottomPane />
          </div>
        </div>
      </>
    );
  }
}

export default App;
