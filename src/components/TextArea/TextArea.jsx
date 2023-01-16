import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getRandomPlaceholderText } from "../../data/placeholderVariations";
import "./TextArea.scss";

const SPACES = "  ";
const SPACES_PER_TAB = 2;

function TextArea({ currentlyActiveTab, currentTabContent, updateTabContent }) {
  const [textContent, setTextContent] = useState(currentTabContent);
  const [placeholder, setPlaceholder] = useState(getRandomPlaceholderText());
  const [numSelectedChars, setNumSelectedChars] = useState(0);
  const [numSelectedWords, setNumSelectedWords] = useState(0);

  const textAreaNodeRef = useRef(null);
  const previouslyActiveTab = useRef(currentlyActiveTab);

  useEffect(() => {
    textAreaNodeRef.current.focus();
    textAreaNodeRef.selectionStart = textContent.length;
    textAreaNodeRef.selectionEnd = textContent.length;
  }, []);

  useEffect(() => {
    if (currentlyActiveTab !== previouslyActiveTab) {
      setTextContent(currentTabContent);
      setPlaceholder(getRandomPlaceholderText());
      textAreaNodeRef.current.focus();
    }
  }, [currentlyActiveTab]);

  const handleTabKeydown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();

      const initialContent = event.target.value;
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
    const selectedText = refValue.value.slice(
      refValue.selectionStart,
      refValue.selectionEnd
    );

    setNumSelectedChars(selectedText.length);
    setNumSelectedWords(
      selectedText.trim() === "" ? 0 : selectedText.split(" ").length
    );
  };

  const onTextChange = (event) => {
    const updatedText = event.target.value;
    setTextContent(updatedText);
    updateTabContent(currentlyActiveTab, updatedText);
  };

  return (
    <>
      <textarea
        className="TextEditor"
        placeholder={textContent ? placeholder : undefined}
        value={textContent}
        ref={textAreaNodeRef}
        onChange={onTextChange}
        onKeyDown={handleTabKeydown}
        onSelect={handleOnTextSelected}
      />
      <div className="bottom-bar">
        {numSelectedChars !== undefined && (
          <div className="info">
            {numSelectedChars}C / {numSelectedWords}W
          </div>
        )}
      </div>
    </>
  );
}

TextArea.propTypes = {
  currentlyActiveTab: PropTypes.string.isRequired,
  currentTabContent: PropTypes.string.isRequired,
  updateTabContent: PropTypes.func.isRequired,
};

export default TextArea;
