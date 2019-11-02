import React from 'react';
import './App.css';

const TextArea = ({ isLarge }) => {
  return (
    <div className={isLarge ? "TextAreaLarge" : "TextAreaSmall"}>
      <div className="actualText" contenteditable="true"></div>
    </div>
  );
}

export default TextArea;
