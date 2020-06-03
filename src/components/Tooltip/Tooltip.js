import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';

const Tooltip = ({ position, text }) => {
  const { top, right } = position; 
  return (
    <div className="Tooltip" style={{ right: `${right}px`, top: `${top}px` }}>
      {text}
    </div>
  );
}

Tooltip.propTypes = {
  position: PropTypes.objectOf(PropTypes.number).isRequired,
  text: PropTypes.string.isRequired
}

export default Tooltip;
