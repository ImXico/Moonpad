import React, { useEffect, useRef, useState } from "react";
import {
  ConnectedProps,
  DispatchProps,
} from "../../containers/TextAreaContainer";
import { getRandomPlaceholderText } from "../../util/placeholders";
import { StyledTextArea, BottomBar, BottomBarInfo } from "./styled";

const SPACES = "  ";
const SPACES_PER_TAB = 2;

type Props = ConnectedProps & DispatchProps;

export function TextArea({
  currentlyActiveTab,
  currentTabContent,
  updateTabContent,
}: Props) {
  const [textContent, setTextContent] = useState(currentTabContent);
  const [placeholder, setPlaceholder] = useState(getRandomPlaceholderText());
  const [numSelectedChars, setNumSelectedChars] = useState(0);
  const [numSelectedWords, setNumSelectedWords] = useState(0);

  const textAreaNodeRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaNodeRef.current) {
      textAreaNodeRef.current.focus();
      textAreaNodeRef.current.selectionStart = textContent.length;
      textAreaNodeRef.current.selectionEnd = textContent.length;
    }
  }, []);

  useEffect(() => {
    setTextContent(currentTabContent);
    setPlaceholder(getRandomPlaceholderText());
    textAreaNodeRef.current?.focus();
  }, [currentlyActiveTab]);

  const handleTabKeydown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();

      if (!textAreaNodeRef.current) {
        return;
      }

      const initialContent = (event.target as HTMLTextAreaElement).value;
      const { selectionStart, selectionEnd } = textAreaNodeRef.current;

      textAreaNodeRef.current.selectionStart = selectionEnd + SPACES_PER_TAB;
      textAreaNodeRef.current.selectionEnd = selectionEnd + SPACES_PER_TAB;

      setTextContent(
        initialContent.substring(0, selectionStart) +
          SPACES +
          initialContent.substring(selectionEnd)
      );
    }
  };

  const handleOnTextSelected = () => {
    const refValue = textAreaNodeRef.current;

    if (refValue) {
      const selectedText = refValue.value.slice(
        refValue.selectionStart,
        refValue.selectionEnd
      );

      setNumSelectedChars(selectedText.length);
      setNumSelectedWords(
        selectedText.trim() === "" ? 0 : selectedText.split(" ").length
      );
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedText = event.target.value;
    setTextContent(updatedText);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    updateTabContent(currentlyActiveTab!, updatedText);
  };

  return (
    <>
      <StyledTextArea
        placeholder={textContent ? placeholder : undefined}
        value={textContent}
        ref={textAreaNodeRef}
        onChange={onTextChange}
        onKeyDown={handleTabKeydown}
        onSelect={handleOnTextSelected}
      />
      <BottomBar>
        {numSelectedChars !== 0 && (
          <BottomBarInfo>
            {numSelectedChars}C / {numSelectedWords}W
          </BottomBarInfo>
        )}
      </BottomBar>
    </>
  );
}
