import React from 'react';
import { connect } from 'react-redux';
import { showToastPopup } from '../../actions/toastPopup';
import { TOGGLE_ALWAYS_ON_TOP, TOGGLE_ALWAYS_ON_TOP_RESPONSE } from '../../data/ipcActions';
import ToastPopup from '../../components/ToastPopup/ToastPopup';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
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
        ipcRenderer.once(TOGGLE_ALWAYS_ON_TOP_RESPONSE, (_, { message }) => {
          this.props.dispatch(showToastPopup(message));
        })
      } else if (event.key === 's') {
        this.props.dispatch(showToastPopup('Your content is auto-saved!'));
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
      <ToastPopup />
    </>
    );
  }
}

export default connect()(App);
