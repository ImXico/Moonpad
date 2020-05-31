import React from 'react';
import './BottomPane.scss';
import ToggableIconButton from '../TogglableIconButton/ToggableIconButton';
// import PropTypes from 'prop-types';

const BottomPane = () => {
  return (
    <div className="BottomPane">
      <ToggableIconButton
        iconName={'pushpin'}
        tooltipText={'Toggle Always On Top'}
        isActive={false}
        onActivating={() => {}}
        onDeactivating={() => {}}
      />
      <ToggableIconButton
        iconName={'theme'}
        tooltipText={'Toggle Color Theme'}
        isActive={false}
        onActivating={() => {}}
        onDeactivating={() => {}}
      />
    </div>
  );
}

export default BottomPane;
