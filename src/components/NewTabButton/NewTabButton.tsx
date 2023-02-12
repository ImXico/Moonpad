import React from "react";
import { StyledNewTabButton } from "./styled";

const NEW_TAB_BUTTON_SYMBOL = "+";

type Props = {
  isVisible: boolean;
  onClick: () => void;
};

export function NewTabButton({ isVisible, onClick }: Props) {
  return (
    <StyledNewTabButton type="button" isVisible={isVisible} onClick={onClick}>
      {NEW_TAB_BUTTON_SYMBOL}
    </StyledNewTabButton>
  );
}
