import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export const PopupMenuItemShape = {
  text: PropTypes.string,
  onEntrySelected: PropTypes.func
}

const PopupMenuItem = ({ text, isEnabled, onEntrySelected }) => {
  const style = `PopupMenuItem ${!isEnabled && "PopupMenuItem--disabled"}`;
  return (
    <button
      className={style}
      onClick={() => isEnabled && onEntrySelected()}
    >
      {text}
    </button>
  );
}

PopupMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  onEntrySelected: PropTypes.func.isRequired
}

export default PopupMenuItem;