import styled from "styled-components";

export const StyledNewTabButton = styled.button<{
  isVisible: boolean;
}>`
  border: none;
  font-size: medium;
  color: #d8dee9; // TODO textPrimaryColor
  width: ${(props) => (props.isVisible ? "100%" : "0%")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:focus {
    outline: none;
  }
`;
