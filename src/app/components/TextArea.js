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
      textContent: '',
      mirroredTextContent: ''
    }
    this.textAreaRef = React.createRef();
    this.moveEmulatedCaret = this.moveEmulatedCaret.bind(this);
    this.saveUpdatedContent = this.saveUpdatedContent.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextAreaClick = this.onTextAreaClick.bind(this);
    this.onArrowKeyPress = this.onArrowKeyPress.bind(this);
    this.focusTextArea = this.focusTextArea.bind(this);
  }

  componentDidMount() {
    // Fetch tab content for the first time.
    ipcRenderer.send(LOAD_TAB_CONTENT, this.props.activeTabName);
    // When we change to some tab, we retrieve the most up-to-date information held by tab.
    ipcRenderer.on(TAB_CONTENT_RETRIEVED, (_, data) => {
      this.setState({ textContent: data.tabContent });
      this.focusTextArea();
    });
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.activeTabName !== this.props.activeTabName) {
      ipcRenderer.send(LOAD_TAB_CONTENT, this.props.activeTabName);
      this.focusTextArea();
    }
  }

  focusTextArea() {
    this.textAreaRef.current.focus();
  }

  moveEmulatedCaret() {
    const caretPosition = this.textAreaRef.current.selectionStart;
    if (!caretPosition) return;
    console.log(caretPosition, this.state.textContent.substring(0, caretPosition));
    this.setState(prevState => {
      return {
        mirroredTextContent: prevState.textContent.substring(0, caretPosition)
      }
    });
  }

  onTextChange(event) {
    this.setState({ textContent: event.target.value });
    this.moveEmulatedCaret();
  }

  onTextAreaClick() {
    this.moveEmulatedCaret();
  }

  onArrowKeyPress() {
    this.moveEmulatedCaret();
  }

  saveUpdatedContent() {
    ipcRenderer.send(UPDATE_TAB_CONTENT, {
      nameOfTabToBeUpdated: this.props.activeTabName,
      updatedContent: this.state.textContent
    });
  }

  render() {
    const { isLarge } = this.props;
    const { textContent, mirroredTextContent } = this.state;
    return (
      <div className={isLarge ? "textAreaLarge" : "textAreaSmall"}>
        <div className="mirrorTextBox fontStyle">
          {mirroredTextContent}
        </div>
        <textarea
          className="inputTextBox fontStyle"
          value={textContent}
          ref={this.textAreaRef}
          onChange={this.onTextChange}
          onKeyUp={this.onArrowKeyPress}
          onKeyDown={this.onArrowKeyPress}
          onClick={this.onTextAreaClick}
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
