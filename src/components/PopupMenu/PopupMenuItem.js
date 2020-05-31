import React from 'react';
import PropTypes from 'prop-types';
import './PopupMenu.scss';

const PopupMenuItem = ({ text, isEnabled, onEntrySelected }) => {
  const style = `PopupMenuItem PopupMenuItem--${isEnabled ? 'enabled' : 'disabled' }`;
  return (
    <button
      className={style}
      onClick={() => isEnabled && onEntrySelected()}
    >
      {text}
    </button>
  );
}

export const PopupMenuItemShape = {
  text: PropTypes.string,
  onEntrySelected: PropTypes.func
}

PopupMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  onEntrySelected: PropTypes.func.isRequired
}

export default PopupMenuItem;