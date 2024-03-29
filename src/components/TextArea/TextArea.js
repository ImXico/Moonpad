import React from 'react';
import PropTypes from 'prop-types';
import { getRandomPlaceholderTextVariation } from '../../data/placeholderVariations';
import './TextArea.scss';

class TextArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: this.props.currentTabContent,
      placeholder: getRandomPlaceholderTextVariation(),
      numCurrentlySelectedChars: undefined,
      numCurrentlySelectedWords: undefined
    }
    this.textAreaRef = React.createRef();
    this.onTextChange = this.onTextChange.bind(this);
    this.saveUpdatedContent = this.saveUpdatedContent.bind(this);
    this.handleTabKeydown = this.handleTabKeydown.bind(this);
    this.handleOnTextSelected = this.handleOnTextSelected.bind(this);
    this.calculateCharsAndWordsSelected = this.calculateCharsAndWordsSelected.bind(this);
  }

  componentDidMount() {
    this.textAreaRef.current.focus();
    this.textAreaRef.current.selectionStart = this.state.textContent.length;
    this.textAreaRef.current.selectionEnd = this.state.textContent.length;
  }

  componentDidUpdate(prevProps, _) {
    const { currentlyActiveTab } = this.props;
    if (currentlyActiveTab !== prevProps.currentlyActiveTab) {
      this.setState({
        textContent: this.props.currentTabContent,
        placeholder: getRandomPlaceholderTextVariation()
      });
      this.textAreaRef.current.focus();
    }
  }

  handleTabKeydown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();
      const initialContent = event.target.value;
      const selectionStart = this.textAreaRef.current.selectionStart;
      const selectionEnd = this.textAreaRef.current.selectionEnd;

      const SPACES = '  ';
      const SPACES_PER_TAB = 2;

      const content =
        initialContent.substring(0, selectionStart) +
        SPACES +
        initialContent.substring(selectionEnd);

      this.setState({ textContent: content }, () => {
        this.textAreaRef.current.selectionStart = selectionEnd + SPACES_PER_TAB;
        this.textAreaRef.current.selectionEnd = selectionEnd + SPACES_PER_TAB;
      });
    }
  }

  calculateCharsAndWordsSelected(selectedText) {
    const numCharsSelected = selectedText.length;
    const numWordsSelected = selectedText.trim() === '' ? 0 : selectedText.split(' ').length;
    this.setState({
      numCurrentlySelectedChars: numCharsSelected !== 0 ? numCharsSelected : undefined,
      numCurrentlySelectedWords: numWordsSelected
    });
  }

  handleOnTextSelected(_) {
    const textAreaRef = this.textAreaRef.current;
    const start = textAreaRef.selectionStart;
    const end = textAreaRef.selectionEnd;
    const selectedText = textAreaRef.value.slice(start, end);
    this.calculateCharsAndWordsSelected(selectedText);
  }

  onTextChange(event) {
    this.setState({ textContent: event.target.value }, this.saveUpdatedContent);
  }

  saveUpdatedContent() {
    this.props.updateTabContent(this.props.currentlyActiveTab, this.state.textContent);
  }

  render() {
    const {
      textContent,
      numCurrentlySelectedChars,
      numCurrentlySelectedWords
    } = this.state;

    return (
      <>
        <textarea
          className="TextEditor"
          placeholder={textContent === '' && this.state.placeholder}
          value={textContent}
          ref={this.textAreaRef}
          onChange={this.onTextChange}
          onKeyDown={this.handleTabKeydown}
          onSelect={this.handleOnTextSelected}
        />
        <div className="bottom-bar">
          {numCurrentlySelectedChars !== undefined &&
            <div className="info">
              {numCurrentlySelectedChars}C / {numCurrentlySelectedWords}W
            </div>
          }
        </div>
      </>
    );
  }
}

TextArea.propTypes = {
  currentlyActiveTab: PropTypes.string.isRequired,
  currentTabContent: PropTypes.string.isRequired,
  updateTabContent: PropTypes.func.isRequired  
}

export default TextArea;
