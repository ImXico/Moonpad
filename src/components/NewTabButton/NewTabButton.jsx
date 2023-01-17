import React from "react";
import PropTypes from "prop-types";
import "./NewTabButton.scss";

function NewTabButton({ isVisible, onClick }) {
  return (
    <button
      type="button"
      className={`NewTabButton ${isVisible ? "open" : ""}`}
      onClick={onClick}
    >
      +
    </button>
  );
}

NewTabButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewTabButton;
