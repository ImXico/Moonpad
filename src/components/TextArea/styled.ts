import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 55px;
  padding-bottom: 0;
  overflow-y: auto;
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.82em;
  line-height: 1.7em;
  letter-spacing: 0.02em;
  color: ${(props) => props.theme.textPrimaryColor};

  &::selection {
    background-color: ${(props) => props.theme.textPrimarySelectionColor};
  }

  &::placeholder {
    line-height: 1.7em;
    letter-spacing: 0.02em;
    color: ${(props) => props.theme.backgroundPrimaryColorMuted};
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.accentColor};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 38px;
`;

export const BottomBarInfo = styled.div`
  position: absolute;
  left: 50%;
  color: ${(props) => props.theme.backgroundPrimaryColorMuted};
  font-size: 0.75em;
`;
