import React from 'react';
import PropTypes from 'prop-types';
import { getRandomPlaceholderTextVariation } from '../../data/placeholderVariations';
import './TextArea.scss';

class TextArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: this.props.currentTabContent
    }
    this.textAreaRef = React.createRef();
    this.onTextChange = this.onTextChange.bind(this);
    this.saveUpdatedContent = this.saveUpdatedContent.bind(this);
  }

  componentDidUpdate(prevProps, _) {
    const { currentlyActiveTab } = this.props;
    if (currentlyActiveTab !== prevProps.currentlyActiveTab) {
      this.setState({ textContent: this.props.currentTabContent });
      this.textAreaRef.current.focus();
    }
  }

  onTextChange(event) {
    this.setState({
      textContent: event.target.value
    });
  }

  saveUpdatedContent() {
    this.props.updateTabContent(this.props.currentlyActiveTab, this.state.textContent);
  }

  render() {
    const { textContent } = this.state;
    return (
      <textarea
        className="TextEditor"
        placeholder={textContent === '' ? getRandomPlaceholderTextVariation() : ''}
        value={textContent}
        ref={this.textAreaRef}
        onChange={this.onTextChange}
        onBlur={this.saveUpdatedContent}
      />
    );
  }
}

TextArea.propTypes = {
  isThereOnlyOneTab: PropTypes.bool.isRequired,
  currentlyActiveTab: PropTypes.string.isRequired,
  currentTabContent: PropTypes.string.isRequired,
  updateTabContent: PropTypes.func.isRequired  
}

export default TextArea;
