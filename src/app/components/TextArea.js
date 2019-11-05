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
  }

  componentDidMount() {
    // Fetch tab content for the first time.
    ipcRenderer.send(LOAD_TAB_CONTENT, this.props.activeTabName);
    // When we change to some tab, we retrieve the most up-to-date information held by tab.
    ipcRenderer.on(TAB_CONTENT_RETRIEVED, (_, data) => {
      const { tabContent } = data;
      this.setState({ textContent: tabContent });
    });
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.activeTabName !== this.props.activeTabName) {
      ipcRenderer.send(LOAD_TAB_CONTENT, this.props.activeTabName);
    }
  }

  saveUpdatedContent(event) {
    // This is probably not safe. Bare minimum for now, needs review.
    const updatedContent = event.target.innerText;
    ipcRenderer.send(UPDATE_TAB_CONTENT, {
      nameOfTabToBeUpdated: this.props.activeTabName,
      updatedContent
    });
  }

  render() {
    const { isLarge } = this.props;
    const { textContent } = this.state;
    return (
      <div className={isLarge ? "textAreaLarge" : "textAreaSmall"}>
        <div
          className="inputText"
          contentEditable={true}
          onBlur={this.saveUpdatedContent}
        >
          {textContent}
        </div>
      </div>
    );
  }
}

TextArea.propTypes = {
  isLarge: PropTypes.bool.isRequired,
  activeTabName: PropTypes.string.isRequired
}

export default TextArea;
