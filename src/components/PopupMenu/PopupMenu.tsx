import React from "react";
import { PopupMenuItem } from "./PopupMenuItem";
import { StyledPopupMenu } from "./styled";

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
    <StyledPopupMenu style={{ left: `${left}px`, top: `${top}px` }}>
      {entries.map((entry) => (
        <PopupMenuItem
          key={entry.id}
          text={entry.text}
          isEnabled={entry.isEnabled}
          onEntrySelected={entry.onEntrySelected}
        />
      ))}
    </StyledPopupMenu>
  );
}
