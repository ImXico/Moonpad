import React from 'react';
import '../styles/App.css';
import TextArea from './TextArea';
import TabArea from './TabArea';
import { LOAD_ALL_TABS_NAMES, ALL_TABS_NAMES_RETRIEVED } from '../ipc/constants';

const { ipcRenderer } = window.require('electron');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTabAreaOpen: true,
      allTabNames: [],
      currentlyActiveTab: ''
    }
    this.onTabSelected = this.onTabSelected.bind(this);
    this.setupIPC = this.setupIPC.bind(this);
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
      if (event.metaKey && event.key === 'x') {
        this.setState(prevState => {
          return { isTabAreaOpen: !prevState.isTabAreaOpen };
        });
      }
    });
  }

  onTabSelected(tabName) {
    this.setState({ currentlyActiveTab: tabName });
  }

  render() {
    const { isTabAreaOpen, allTabNames, currentlyActiveTab } = this.state;
    return (allTabNames !== []) && (
      <div className="container">
        <TabArea
          isOpen={isTabAreaOpen}
          tabNames={allTabNames}
          onTabSelected={this.onTabSelected}
        />
        <TextArea
          isLarge={!isTabAreaOpen}
          activeTabName={currentlyActiveTab}
        />
      </div>
    );
  }
}

export default App;
