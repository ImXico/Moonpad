import React from 'react';
import PropTypes from 'prop-types';
import '../styles/app.scss';
import { UPDATE_TAB_CONTENT } from '../ipc/constants';

const { ipcRenderer } = window.require('electron');

class TextArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: this.props.activeTabContent,
      mirroredTextContent: this.props.activeTabContent
    }
    this.textAreaRef = React.createRef();
    this.moveEmulatedCaret = this.moveEmulatedCaret.bind(this);
    this.saveUpdatedContent = this.saveUpdatedContent.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextAreaClick = this.onTextAreaClick.bind(this);
    this.onArrowKeyPress = this.onArrowKeyPress.bind(this);
    this.focusTextArea = this.focusTextArea.bind(this);
  }

  componentDidUpdate(prevProps, _) {
    if (this.props.activeTabName !== prevProps.activeTabName) {
      this.setState({ textContent: this.props.activeTabContent });
      this.focusTextArea();
    }
  }

  focusTextArea() {
    this.textAreaRef.current.focus();
  }

  moveEmulatedCaret() {
    const caretPosition = this.textAreaRef.current.selectionStart;
    if (!caretPosition) return;
    this.setState(prevState => {
      return {
        mirroredTextContent: prevState.textContent.substring(0, caretPosition)
      }
    });
  }

  onTextChange(event) {
    this.setState({
      textContent: event.target.value,
      mirroredTextContent: event.target.value
    });
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
    const { textContent } = this.state;
    return (
      <div className="TextEditorPane">
        {/* <div className="mirrorTextBox fontStyle">
          {mirroredTextContent}
        </div> */}
        <textarea
          className="TextEditor"
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
  activeTabName: PropTypes.string.isRequired,
  activeTabContent: PropTypes.string.isRequired
}

export default TextArea;
