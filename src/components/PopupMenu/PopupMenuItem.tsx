import React from "react";
import { StyledPopupMenuItem } from "./styled";

type Props = {
  text: string;
  isEnabled: boolean;
  onEntrySelected: () => void;
};

export function PopupMenuItem({ text, isEnabled, onEntrySelected }: Props) {
  return (
    <StyledPopupMenuItem
      type="button"
      isEnabled={isEnabled}
      onClick={() => isEnabled && onEntrySelected()}
    >
      {text}
    </StyledPopupMenuItem>
  );
}
