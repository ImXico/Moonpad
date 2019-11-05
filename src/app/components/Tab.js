import React from 'react';
import PropTypes from 'prop-types';

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

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Tab;