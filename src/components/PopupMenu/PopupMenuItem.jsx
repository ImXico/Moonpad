import React from "react";
import PropTypes from "prop-types";
import "./PopupMenu.scss";

function PopupMenuItem({ text, isEnabled, onEntrySelected }) {
  const style = `PopupMenuItem PopupMenuItem--${
    isEnabled ? "enabled" : "disabled"
  }`;

  return (
    <button
      type="button"
      className={style}
      onClick={() => isEnabled && onEntrySelected()}
    >
      {text}
    </button>
  );
}

export const PopupMenuItemShape = PropTypes.shape({
  id: PropTypes.number,
  text: PropTypes.string,
  isEnabled: PropTypes.bool.isRequired,
  onEntrySelected: PropTypes.func,
});

PopupMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  onEntrySelected: PropTypes.func.isRequired,
};

export default PopupMenuItem;
