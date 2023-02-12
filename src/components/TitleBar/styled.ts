import styled from "styled-components";

const TitleBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 38px;
  -webkit-app-region: drag;
`;

export const TitleBarMacOS = styled(TitleBar)`
  // Considering the 'traffic lights' are on the left side, leave
  // just a tiny bit for the scrollbar of the TextArea to be fully visibile.
  width: 99.5%;
`;

export const TitleBarLinuxWindowsWrapper = styled(TitleBar)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const WindowButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-right: 10px;
  width: 100px;
  height: 65%;
`;

export const WindowButton = styled.button`
  color: ${(props) => props.theme.backgroundPrimaryColorMuted};
  font-size: 1.3em;
  width: 100%;
  user-select: none; // prevents selection highlighting
  border: none;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${(props) => props.theme.textPrimaryColor};
    transition: color 50ms linear;
  }
`;
