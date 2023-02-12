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
  color: ${(props) => props.theme.accentColor};
`;

export const StyledTab = styled(BaseTab)<{
  isSelected: boolean;
}>`
  ${(props) =>
    props.isSelected
      ? css`
          color: ${(p) => p.theme.selectedTabColor};
          background-color: ${(p) => p.theme.selectedTabSecondaryColor};
        `
      : css`
          color: ${(p) => p.theme.backgroundPrimaryColorMuted};
          &:hover {
            color: ${(p) => p.theme.textPrimaryColor};
            transition: color 100ms linear;
          }
        `}
`;
