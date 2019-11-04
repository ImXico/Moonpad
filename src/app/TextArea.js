import React from 'react';
import './App.css';

const TextArea = ({ isLarge, textContent }) => {
  return (
    <div className={isLarge ? "textAreaLarge" : "textAreaSmall"}>
      <div className="actualText" contenteditable="true">
        {textContent}
      </div>
    </div>
  );
}

export default TextArea;
