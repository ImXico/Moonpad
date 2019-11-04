import React from 'react';
import '../styles/App.css';
import TextArea from './TextArea';
import TabArea from './TabArea';
const { ipcRenderer } = window.require('electron');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTabAreaOpen: true,
      allContent: '',
      currentlyActiveTab: ''
    }
    this.onTabSelected = this.onTabSelected.bind(this);
  }

  componentWillMount() {
    this.loadAllContent();
    this.registerKeyboardEventListeners();
  }

  loadAllContent() {
    ipcRenderer.send('Load-Tabs-And-Content');
    ipcRenderer.on('Data-Retrieved', (_, data) => (
      this.setState({
        allContent: data,
        currentlyActiveTab: Object.keys(data)[0]
      })
    ));
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
    this.setState({ currentlyActiveTab: tabName });
  }

  render() {
    const { isTabAreaOpen, allContent, currentlyActiveTab } = this.state;
    return (allContent !== '') && (
      <div className="container">
        <TabArea
          isOpen={isTabAreaOpen}
          tabNames={Object.keys(allContent)}
          onTabSelected={this.onTabSelected}
        />
        <TextArea
          isLarge={!isTabAreaOpen}
          textContent={allContent[currentlyActiveTab]}
        />
      </div>
    );
  }
}

export default App;
