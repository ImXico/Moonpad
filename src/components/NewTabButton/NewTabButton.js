import React from 'react';
import PropTypes from 'prop-types';
import './NewTabButton.scss';

const NewTabButton = ({ isVisible, onClick }) => (
  <button 
    className={`NewTabButton ${isVisible && 'open'}`}
    onClick={onClick}
  >
    +
  </button>
);

NewTabButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default NewTabButton;
