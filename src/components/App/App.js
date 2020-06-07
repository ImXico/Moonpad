import React from 'react';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
import './App.scss';

// TODO: Handle keydown events for toggle-always-on-top and toggle-theme

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
      if (event.key === '?') {}
    }
  }

  render() {
    return (
      <>
        <div className="__working-area-container">
          <TabAreaContainer />
          <div className="__right-pane-area-container">
            <TextAreaContainer />
            <div className="__bottom-bar" />
          </div>
        </div>
      <div className="__title-bar" />
    </>
    );
  }
}

export default App;
