import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import {
  TAB_CONTENT_RETRIEVED,
  LOAD_TAB_CONTENT,
  UPDATE_TAB_CONTENT
} from '../ipc/constants';

const { ipcRenderer } = window.require('electron');

class TextArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: ''
    }
    this.saveUpdatedContent = this.saveUpdatedContent.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    // Fetch tab content for the first time.
    ipcRenderer.send(LOAD_TAB_CONTENT, this.props.activeTabName);
    // When we change to some tab, we retrieve the most up-to-date information held by tab.
    ipcRenderer.on(TAB_CONTENT_RETRIEVED, (_, data) => {
      this.setState({ textContent: data.tabContent });
    });
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.activeTabName !== this.props.activeTabName) {
      ipcRenderer.send(LOAD_TAB_CONTENT, this.props.activeTabName);
    }
  }

  onTextChange(event) {
    this.setState({ textContent: event.target.value });
  }

  saveUpdatedContent() {
    // This is probably not safe. Bare minimum for now, needs review.
    ipcRenderer.send(UPDATE_TAB_CONTENT, {
      nameOfTabToBeUpdated: this.props.activeTabName,
      updatedContent: this.state.textContent
    });
  }

  render() {
    const { isLarge } = this.props;
    const { textContent } = this.state;
    return (textContent !== '') && (
      <div className={isLarge ? "textAreaLarge" : "textAreaSmall"}>
        <textarea
          className="inputText"
          value={textContent}
          onChange={this.onTextChange}
          onBlur={this.saveUpdatedContent}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  isLarge: PropTypes.bool.isRequired,
  activeTabName: PropTypes.string.isRequired
}

export default TextArea;
