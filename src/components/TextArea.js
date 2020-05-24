import React from 'react';
import '../styles/app.scss';

class TextArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: this.props.currentTabContent
    }
    this.textAreaRef = React.createRef();
    this.saveUpdatedContent = this.saveUpdatedContent.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
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
      textContent: event.target.value,
    });
  }

  saveUpdatedContent() {
    this.props.updateTabContent(this.props.currentlyActiveTab, this.state.textContent);
  }

  render() {
    const { textContent } = this.state;
    return (
      <div className="TextEditorPane">
        <textarea
          className="TextEditor"
          value={textContent}
          ref={this.textAreaRef}
          onChange={this.onTextChange}
          onBlur={this.saveUpdatedContent}
        />
      </div>
    );
  }
}

export default TextArea;
