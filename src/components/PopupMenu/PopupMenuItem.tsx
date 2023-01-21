import React from "react";
import PropTypes from "prop-types";
import "./PopupMenu.scss";

type Props = {
  text: string;
  isEnabled: boolean;
  onEntrySelected: () => void;
};

export function PopupMenuItem({ text, isEnabled, onEntrySelected }: Props) {
  const className = `PopupMenuItem PopupMenuItem--${
    isEnabled ? "enabled" : "disabled"
  }`;

  return (
    <button
      type="button"
      className={className}
      onClick={() => isEnabled && onEntrySelected()}
    >
      {text}
    </button>
  );
}
