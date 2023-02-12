import styled, { css } from "styled-components";

const BaseTab = styled.button`
  cursor: pointer;
  border: none;
  margin-bottom: 17px;
  padding: 10px 0;
  font-size: 0.75em;
  width: 100%;
  user-select: none; // prevents selection highlighting

  &:focus {
    outline: none;
  }
`;

export const StyledTabInEditMode = styled(BaseTab)`
  text-align: center;
  color: #88c0d0; // TODO accentColor
`;

export const StyledTab = styled(BaseTab)<{
  isSelected: boolean;
}>`
  ${(props) =>
    props.isSelected
      ? css`
          color: #e5e9f0; // TODO selectedTabColor
          background-color: #434c5e; // TODO selectedTabSecondaryColor
        `
      : css`
          color: #4c536a; // TODO backgroundPrimaryColorMuted

          &:hover {
            color: #d8dee9; // TODO textPrimaryColor
            color: ${(p) => p.theme.textPrimaryColor};
            transition: color 100ms linear;
          }
        `}
`;
