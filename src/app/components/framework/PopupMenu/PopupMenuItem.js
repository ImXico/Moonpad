import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export const PopupMenuItemShape = {
  text: PropTypes.string,
  onEntrySelected: PropTypes.func
}

const PopupMenuItem = ({ text, onEntrySelected }) => {
  return (
    <button className="PopupMenuItem" onClick={() => onEntrySelected()}>
      {text}
    </button>
  );
}

PopupMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onEntrySelected: PropTypes.func.isRequired
}

export default PopupMenuItem;