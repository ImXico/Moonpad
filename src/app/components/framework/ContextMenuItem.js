import React from 'react';
import PropTypes from 'prop-types';

export const ContextMenuItemShape = {
  text: PropTypes.string,
  onEntrySelected: PropTypes.func
}

const ContextMenuItem = ({ text, onEntrySelected }) => {
  return (
    <button className="ContextMenuItem" onClick={() => onEntrySelected}>
      {text}
    </button>
  );
}

ContextMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onEntrySelected: PropTypes.func.isRequired
}

export default ContextMenuItem;