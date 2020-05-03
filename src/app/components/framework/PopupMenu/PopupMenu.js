import React from 'react';
import PopupMenuItem, { PopupMenuItemShape } from './PopupMenuItem';
import PropTypes from 'prop-types';
import './styles.scss';

const PopupMenu = ({ position, entries }) => {
  const { top, left } = position; 
  return (
    <div className="PopupMenu" style={{ left: `${left}px`, top: `${top}px` }}>
      {entries.map(entry => <PopupMenuItem {...entry} />)}
    </div>
  );
}

PopupMenu.propTypes = {
  position: PropTypes.objectOf(PropTypes.number),
  entries: PropTypes.arrayOf(PopupMenuItemShape)
}

export default PopupMenu;