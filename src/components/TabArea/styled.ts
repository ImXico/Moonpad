import styled from "styled-components";

export const TabAreaWrapper = styled.div<{
  isTabAreaOpen: boolean;
}>`
  display: flex;
  position: sticky;
  width: 0%;
  height: 100%;
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  ${(props) => props.isTabAreaOpen && `opacity: 1; width: 20%;`}
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 90px 0px 0px 0px;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const ScrollPast = styled.div`
  margin-top: 150px;
`;
