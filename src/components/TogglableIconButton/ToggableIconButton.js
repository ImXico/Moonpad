import React from 'react';

const ToggableIconButton = ({ iconName, tooltipText, isActive, onActivating, onDeactivating }) => {
  const iconActive = require(`../../fonts/${iconName}-active.png`);
  const iconInactive = require(`../../fonts/${iconName}-inactive.png`);

  const style = {
    background: `url(${isActive ? iconActive : iconInactive}) no-repeat`,
    backgroundPosition: 'center',
    width: '22px',
    height: '22px',
    border: 'none',
    margin: '10px 10px 10px 0px',
    cursor: 'pointer'
  }
  
  return (
    <button
      style={style}
      title={tooltipText}
      onClick={isActive ? onDeactivating() : onActivating()}
    >
    </button>
  );
}

export default ToggableIconButton;
