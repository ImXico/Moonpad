import React from 'react';
import PropTypes from 'prop-types';
import PopupMenuItem, { PopupMenuItemShape } from './PopupMenuItem';
import './PopupMenu.scss';

const PopupMenu = ({ position, entries }) => {
  const { top, left } = position; 
  return (
    <div className="PopupMenu" style={{ left: `${left}px`, top: `${top}px` }}>
      {entries.map(entry => <PopupMenuItem {...entry} />)}
    </div>
  );
}

PopupMenu.propTypes = {
  position: PropTypes.objectOf(PropTypes.number).isRequired,
  entries: PropTypes.arrayOf(PopupMenuItemShape).isRequired
}

export default PopupMenu;
