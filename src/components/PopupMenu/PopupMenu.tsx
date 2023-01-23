import React from "react";
import "./PopupMenu.scss";
import { PopupMenuItem } from "./PopupMenuItem";

export type PopupMenuItemEntry = {
  id: number;
  text: string;
  isEnabled: boolean;
  onEntrySelected: () => void;
};

type Props = {
  entries: PopupMenuItemEntry[];
  position: {
    top: number | null;
    left: number | null;
  };
};

export function PopupMenu({ position, entries }: Props) {
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
