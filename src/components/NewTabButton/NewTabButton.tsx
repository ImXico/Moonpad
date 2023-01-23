import React from "react";
import "./NewTabButton.scss";

type Props = {
  isVisible: boolean;
  onClick: () => void;
};

export function NewTabButton({ isVisible, onClick }: Props) {
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
