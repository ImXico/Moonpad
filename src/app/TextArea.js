import React from 'react';
import './App.css';

class TextArea extends React.Component {

  render() {
    return (
      <div className="TextArea">
        <div className="actualText" contenteditable="true"></div>
      </div>
    );
  }
}

export default TextArea;
