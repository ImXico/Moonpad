import React from "react";
import PropTypes from "prop-types";
import PopupMenuItem, { PopupMenuItemShape } from "./PopupMenuItem";
import "./PopupMenu.scss";

function PopupMenu({ position, entries }) {
  const { top, left } = position;

  return (
    <div className="PopupMenu" style={{ left: `${left}px`, top: `${top}px` }}>
      {entries.map((entry) => (
        <PopupMenuItem
          key={entry.id}
          text={entry.text}
          isEnabled={entry.isEnabled}
          onEntrySelected={entry.onEntrySelected}
        />
      ))}
    </div>
  );
}

PopupMenu.propTypes = {
  position: PropTypes.objectOf(PropTypes.number).isRequired,
  entries: PropTypes.arrayOf(PopupMenuItemShape).isRequired,
};

export default PopupMenu;
