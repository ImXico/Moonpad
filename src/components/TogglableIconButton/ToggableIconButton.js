import React from 'react';
import PropTypes from 'prop-types';

const ToggableIconButton = ({ iconName, tooltipText, isActive, onClick }) => {
  const iconActive = require(`../../fonts/${iconName}-active.png`);
  const iconInactive = require(`../../fonts/${iconName}-inactive.png`);

  const style = {
    background: `url(${isActive ? iconActive : iconInactive}) no-repeat`,
    backgroundPosition: 'center',
    width: '16px',
    height: '16px',
    border: 'none',
    margin: '12px 12px 12px 0px',
    cursor: 'pointer',
    outline: 'none'
  }
  
  return (
    <button
      style={style}
      title={tooltipText}
      onClick={onClick}
    >
    </button>
  );
}

ToggableIconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ToggableIconButton;
