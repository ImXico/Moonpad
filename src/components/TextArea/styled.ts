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
  color: #d8dee9; // TODO textPrimaryColor

  &::selection {
    background-color: #9fccd9; // TODO textPrimarySelectionColor
  }

  &::placeholder {
    line-height: 1.7em;
    letter-spacing: 0.02em;
    color: #4c536a; // TODO backgroundPrimaryColorMuted
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #88c0d0; // TODO accentColor
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
  color: #4c536a; // TODO backgroundPrimaryColorMuted
  font-size: 0.75em;
`;
