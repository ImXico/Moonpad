import React from 'react';
import './App.css';

class TextArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Welcome to scribbl!'
    }
  }

  render() {
    return (
      <div contenteditable="true" style={{minHeight:'50px', width:'300px'}} className="TextArea cursor">
      </div>
    );
  }
}

export default TextArea;
