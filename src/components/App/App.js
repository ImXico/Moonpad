import React from 'react';
import PropTypes from 'prop-types';
import { TOGGLE_ALWAYS_ON_TOP, TOGGLE_ALWAYS_ON_TOP_RESPONSE } from '../../data/ipcActions';
import ThemeWrapper, { Themes } from '../ThemeWrapper/ThemeWrapper';
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
        ipcRenderer.once(TOGGLE_ALWAYS_ON_TOP_RESPONSE, (_, payload) => {
          const { message } = payload;
          this.props.showToast(message);
        });
      } else if (event.key === 's') {
        this.props.showToast('Your content is auto-saved!');
      } else if (event.key === 't') {
        // TODO
        // this.props.toggleColorTheme(!this.props.isDarkTheme)
      }
    }
  }

  render() {
    return (
      <ThemeWrapper theme={this.props.isDarkTheme ? Themes.Dark : Themes.Light}>
        <div className="working-area-container">
          <TabAreaContainer />
          <div className="right-pane-area-container">
            <TextAreaContainer />
          </div>
        </div>
        <div className="title-bar" />
        <ToastPopup />
      </ThemeWrapper>
    );
  }
}

App.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  showToast: PropTypes.func.isRequired,
  toggleColorTheme: PropTypes.func.isRequired
}

export default App;
