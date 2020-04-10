import React from 'react';
import '../styles/App.css';
import TextArea from './TextArea';
import TabArea from './TabArea';
import {
  LOAD_ALL_TABS_NAMES,
  ALL_TABS_NAMES_RETRIEVED,
  CREATE_NEW_TAB
} from '../ipc/constants';

const { ipcRenderer } = window.require('electron');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTabAreaOpen: true,
      allTabNames: [],
      currentlyActiveTab: ''
    }
    this.setupIPC = this.setupIPC.bind(this);
    this.onTabSelected = this.onTabSelected.bind(this);
    this.onCreateNewTabClicked = this.onCreateNewTabClicked.bind(this);
  }

  componentDidMount() {
    this.setupIPC();
    this.loadAllTabsNames();
    this.registerKeyboardEventListeners();
  }

  setupIPC() {
    ipcRenderer.on(ALL_TABS_NAMES_RETRIEVED, (_, data) => (
      this.setState({
        allTabNames: [...data],
        currentlyActiveTab: data[0]
      })
    ));
  }

  loadAllTabsNames() {
    ipcRenderer.send(LOAD_ALL_TABS_NAMES);
  }

  registerKeyboardEventListeners() {
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
    this.setState({ currentlyActiveTab: tabName });
  }

  onCreateNewTabClicked() {
    const newTabName = `Tab${this.state.allTabNames.length + 1}`;
    ipcRenderer.send(CREATE_NEW_TAB, newTabName);
    this.setState(prevState => {
      return {
        allTabNames: [...prevState.allTabNames, newTabName],
        currentlyActiveTab: newTabName
      }
    });
  }

  render() {
    const { isTabAreaOpen, allTabNames, currentlyActiveTab } = this.state;
    return (allTabNames !== []) && (
      <>
        <div className="title-bar"></div>
        <div className="container">
          <TabArea
            isOpen={isTabAreaOpen}
            tabNames={allTabNames}
            onTabSelected={this.onTabSelected}
            onCreateNewTabClicked={this.onCreateNewTabClicked}
          />
          <TextArea
            activeTabName={currentlyActiveTab}
          />
        </div>
      </>
    );
  }
}

export default App;
