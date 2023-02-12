import styled from "styled-components";

export const StyledToastPopup = styled.div<{
  isShowing: boolean;
}>`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 20px;
  margin-top: 20px;
  width: 230px;
  height: 40px;
  color: ${(props) => props.theme.textPrimaryColor};
  background-color: ${(props) => props.theme.backgroundSecondaryColor};
  text-align: center;
  padding: 15px;
  font-size: 0.7em;
  border-radius: 2px;
  box-shadow: 5px 5px 30px -3px rgba(0, 0, 0, 0.22);
  opacity: ${(props) => (props.isShowing ? 1 : 0)};
  z-index: ${(props) => (props.isShowing ? 99999 : -1)};
  transition: all ease-in-out 0.25s;
`;
