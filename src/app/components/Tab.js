import React from 'react';

const Tab = ({ name, isOpen, onSelect }) => {
  return (
    <button
      className={isOpen ? "tabOpen" : "tabClosed"}
      onClick={() => onSelect(name)}
    >
      {name}
    </button>
  );
}

export default Tab;