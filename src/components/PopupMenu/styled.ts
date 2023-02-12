import styled, { css } from "styled-components";

export const StyledPopupMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 140px;
  z-index: 1;
  padding: 10px 15px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.backgroundSecondaryColor};
  box-shadow: 5px 5px 30px -3px rgba(0, 0, 0, 0.22);

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: ${(props) => props.theme.backgroundSecondaryColor};
    border-left: 0;
    margin-top: -63px;
    margin-left: -6px;
  }
`;

export const StyledPopupMenuItem = styled.button<{
  isEnabled: boolean;
}>`
  background-color: ${(props) => props.theme.backgroundSecondaryColor};
  border-radius: 2px;
  border: none;
  font-size: 0.75em;
  margin: 2px 0;
  padding: 10px;
  text-align: left;
  user-select: none; // prevents selection highlighting

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.isEnabled
      ? css`
          cursor: pointer;
          color: ${(p) => p.theme.textPrimaryColor};
          &:hover {
            background-color: ${(p) => p.theme.backgroundSecondaryColorMuted};
          }
        `
      : css`
          cursor: default;
          color: ${(p) => p.theme.backgroundSecondaryColorMuted};
        `}
`;
