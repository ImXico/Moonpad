import React from 'react';
import PropTypes from 'prop-types';

const NewTabButton = ({ onClick }) => {
  return (
    <button className="NewTabButton" onClick={onClick}>+</button>
  );
}

NewTabButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default NewTabButton;