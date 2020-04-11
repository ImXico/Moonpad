import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ name, visibility, isSelected, onSelect }) => {
  const selectedStyle = isSelected ? 'selected' : 'unselected';
  const className = `Tab Tab--${selectedStyle} Tab--${selectedStyle}--${visibility}`;
  return (
    <button
      className={className}
      onClick={() => onSelect(name)}
    >
      {name}
    </button>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Tab;