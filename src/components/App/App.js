import React from 'react';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
import { TOGGLE_ALWAYS_ON_TOP } from '../../data/ipcActions';
import './App.scss';

const { ipcRenderer } = window.require('electron');

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleKeydownEvents = this.handleKeydownEvents.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownEvents);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownEvents);
  }

  handleKeydownEvents(event) {
    if (event.metaKey) {
      if (event.key === '.') {
        ipcRenderer.send(TOGGLE_ALWAYS_ON_TOP); 
      }
    }
  }

  render() {
    return (
      <>
        <div className="working-area-container">
          <TabAreaContainer />
          <div className="right-pane-area-container">
            <TextAreaContainer />
            <div className="bottom-bar" />
          </div>
        </div>
      <div className="title-bar" />
    </>
    );
  }
}

export default App;
