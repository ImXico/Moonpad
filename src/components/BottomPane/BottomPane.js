import React from 'react';
import './BottomPane.scss';
import ToggableIconButton from '../TogglableIconButton/ToggableIconButton';

const BottomPane = ({ isAlwaysOnTop, toggleAlwaysOnTop }) => {
  return (
    <div className="BottomPane">
      <ToggableIconButton
        iconName={'pushpin'}
        tooltipText={'Toggle Always On Top'}
        isActive={isAlwaysOnTop}
        onClick={() => toggleAlwaysOnTop(!isAlwaysOnTop)}
      />
      <ToggableIconButton
        iconName={'theme'}
        tooltipText={'Toggle Color Theme'}
        isActive={false}
        onClick={() => null}
      />
    </div>
  );
}

export default BottomPane;
