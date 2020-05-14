import React from 'react';
import '../styles/app.scss';
import BottomPane from './BottomPane';
import TabArea from './TabArea';
import TextArea from './TextArea';
import {
  ALL_TABS_CONTENT_RETRIEVED,
  CREATE_NEW_TAB,
  LOAD_ALL_TABS_CONTENT
} from '../ipc/constants';

const { ipcRenderer } = window.require('electron');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabsAndContent: undefined,
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
    ipcRenderer.on(ALL_TABS_CONTENT_RETRIEVED, (_, data) => (
      this.setState(prevState => {
        return {
          tabsAndContent: {...data},
          currentlyActiveTab: prevState.currentlyActiveTab === undefined 
            ? Object.keys(data)[0]
            : prevState.currentlyActiveTab
        }
      })
    ));
  }

  loadAllTabsAndContent() {
    ipcRenderer.send(LOAD_ALL_TABS_CONTENT);
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

  onTabSelected(tabName) {
    if (tabName !== this.state.currentlyActiveTab) {
      this.setState({ currentlyActiveTab: tabName });
      // Refresh tha "all content" data here to prevent any flicks when 
      // switching to some other tab in the future.
      this.loadAllTabsAndContent(); 
    }
  }

  onCreateNewTabClicked() {
    const currentNumTabs = Object.keys(this.state.tabsAndContent).length;
    const newTabDefaultName = `Tab${currentNumTabs + 1}`;
    ipcRenderer.send(CREATE_NEW_TAB, newTabDefaultName);
    this.setState(prevState => {
      return {
        tabsAndContent: {...prevState.tabsAndContent, [newTabDefaultName]: ""},
        currentlyActiveTab: newTabDefaultName
      }
    });
  }

  render() {
    const { isTabAreaOpen, tabsAndContent, currentlyActiveTab } = this.state;
    return (tabsAndContent !== undefined) && (
      <>
        <div className="__title-bar"></div>
        <div className="__working-area-container">
          <TabArea
            isOpen={isTabAreaOpen}
            tabNames={Object.keys(tabsAndContent)}
            currentlySelectedTab={currentlyActiveTab}
            onTabSelected={this.onTabSelected}
            onCreateNewTabClicked={this.onCreateNewTabClicked}
          />
          <div className="__right-pane-area-container">
            <TextArea
              activeTabName={currentlyActiveTab}
              activeTabContent={tabsAndContent[currentlyActiveTab]}
            />
            <BottomPane />
          </div>
        </div>
      </>
    );
  }
}

export default App;
