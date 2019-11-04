import React from 'react';
import './App.css';
import TextArea from './TextArea';
import TabArea from './TabArea';

const mockData = {
  'Tab1': 'Hello world! This is Tab 1!',
  'Tab2': 'Goodbye world! This is Tab 2!',
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isTabAreaOpen: true,
      current: mockData.Tab1
    }
    this.onTabSelected = this.onTabSelected.bind(this);
  }

  onTabSelected(tabName) {
    this.setState({ current: mockData[tabName] });
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
    const { isTabAreaOpen, current } = this.state;
    return (
      <div className="container">
        <TabArea
          isOpen={isTabAreaOpen}
          tabNames={Object.keys(mockData)}
          onTabSelected={this.onTabSelected}
        />
        <TextArea
          isLarge={!isTabAreaOpen}
          textContent={current}
        />
      </div>
    );
  }
}

export default App;
