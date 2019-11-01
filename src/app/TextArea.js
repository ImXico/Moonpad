import React from 'react';
import './App.css';

class TextArea extends React.Component {

  render() {
    return (
      <div contenteditable="true" style={{minHeight:'50px', width:'300px'}} className="TextArea cursor">
      </div>
    );
  }
}

export default TextArea;
