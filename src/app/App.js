import React from 'react';
import './App.css';
import TextArea from './TextArea';
import TabArea from './TabArea';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTabAreaOpen: true
    }
  }

  componentWillMount() {
    // TODO: Remove the listener on componentWillUnmount.
    window.addEventListener('keydown', (event) => {
      if (event.metaKey && event.key === 'x') {
        this.setState(prevState => {
          return { isTabAreaOpen: !prevState.isTabAreaOpen };
        });
      }
    });
  }

  render() {
    const { isTabAreaOpen } = this.state;
    return (
      <div className="container">
        <TabArea isOpen={isTabAreaOpen} />
        <TextArea isLarge={!isTabAreaOpen} />
      </div>
    );
  }
}

export default App;
