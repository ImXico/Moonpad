import React from 'react';
import './App.css';

const TabArea = ({ isOpen }) => {
  return (
    <div className={isOpen ? "TabAreaOpen" : "TabAreaClosed"}></div>
  );
}

export default TabArea;