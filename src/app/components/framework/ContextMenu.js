import React from 'react';
import ContextMenuItem, { ContextMenuItemShape } from './ContextMenuItem';
import PropTypes from 'prop-types';

const ContextMenu = ({ position, entries }) => {
  const { left, top } = position; 
  return (
    <div className="ContextMenu" style={{ left: `${left}px`, top: `${top}px` }}>
      {entries.map(entry => <ContextMenuItem {...entry} />)}
    </div>
  );
}

ContextMenu.propTypes = {
  position: PropTypes.objectOf(PropTypes.number),
  entries: PropTypes.arrayOf(ContextMenuItemShape)
}

export default ContextMenu;