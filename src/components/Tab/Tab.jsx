import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import PopupMenu from "../PopupMenu/PopupMenu";
import "./Tab.scss";

const MENU_OPTION_MOVE_UP = "Move up";
const MENU_OPTION_MOVE_DOWN = "Move down";
const MENU_OPTION_EDIT_NAME = "Edit name";
const MENU_OPTION_DELETE = "Delete";

const POPUP_TOP_TWEAK_PX = 17;
const POPUP_LEFT_TWEAK_PX = 15;

function Tab({
  id,
  index,
  isSelected,
  name,
  canTabBeMovedUp,
  canTabBeMovedDown,
  onUpdateTabName,
  onDelete,
  onSelect,
  onMoveTabUp,
  onMoveTabDown,
}) {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isNameBeingEdited, setIsNameBeingEdited] = useState(false);
  const [tabNameInEdition, setTabNameInEdition] = useState("");
  const [popupMenuPosition, setPopupMenuPosition] = useState(undefined);

  const tabRef = useRef(null);
  const popupMenuEntries = useRef([]);

  const closeAndResetPopupMenu = () => {
    setIsPopupMenuOpen(false);
    setPopupMenuPosition(undefined);
  };

  const closeAndResetNameEditMode = () => {
    setIsNameBeingEdited(false);
    setTabNameInEdition("");
  };

  const handleDocumentWideClick = useCallback(
    (event) => {
      if (!tabRef.current.contains(event.target)) {
        if (isPopupMenuOpen) {
          closeAndResetPopupMenu();
        }

        if (isNameBeingEdited) {
          closeAndResetNameEditMode();
        }
      }
    },
    [isPopupMenuOpen, isNameBeingEdited]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentWideClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentWideClick);
    };
  }, [handleDocumentWideClick]);

  useEffect(() => {
    popupMenuEntries.current = [
      {
        id: 0,
        text: MENU_OPTION_MOVE_UP,
        isEnabled: canTabBeMovedUp(index),
        onEntrySelected: () => {
          onMoveTabUp(id);
          closeAndResetPopupMenu();
        },
      },
      {
        id: 1,
        text: MENU_OPTION_MOVE_DOWN,
        isEnabled: canTabBeMovedDown(index),
        onEntrySelected: () => {
          onMoveTabDown(id);
          closeAndResetPopupMenu();
        },
      },
      {
        id: 2,
        text: MENU_OPTION_EDIT_NAME,
        isEnabled: true,
        onEntrySelected: () => {
          setIsNameBeingEdited(true);
          closeAndResetPopupMenu();
        },
      },
      {
        id: 3,
        text: MENU_OPTION_DELETE,
        isEnabled: index > 1,
        onEntrySelected: () => {
          onDelete(id, name);
          closeAndResetPopupMenu();
        },
      },
    ];
  }, [index]);

  const calculatePopupMenuPosition = () => {
    const ref = tabRef.current;
    const tabsContainerScrollTop = ref.parentElement.scrollTop;
    const top = ref.offsetTop - tabsContainerScrollTop - POPUP_TOP_TWEAK_PX;
    const left = ref.clientWidth + POPUP_LEFT_TWEAK_PX;
    return { top, left };
  };

  const handleTopLevelContextMenuOpen = () => {
    onSelect(id);
    setIsPopupMenuOpen(true);
    setPopupMenuPosition(calculatePopupMenuPosition());
  };

  const handleTabNameEdit = (event) => {
    setTabNameInEdition(event.target.value);
  };

  const handleTabNameEditFinish = (event) => {
    if (event.key === "Enter") {
      const newName = tabNameInEdition;
      setIsNameBeingEdited(false);
      setTabNameInEdition("");
      onUpdateTabName(id, newName);
    } else if (event.key === "Escape") {
      closeAndResetNameEditMode();
    }
  };

  return (
    <div ref={tabRef}>
      {isNameBeingEdited ? (
        <input
          className="Tab Tab--editing-name"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          minLength={1}
          maxLength={12}
          value={tabNameInEdition}
          onChange={(event) => handleTabNameEdit(event)}
          onKeyDown={(event) => handleTabNameEditFinish(event)}
        />
      ) : (
        <button
          type="button"
          className={`Tab Tab--${isSelected ? "selected" : "unselected"}`}
          onClick={() => onSelect(id)}
          onContextMenu={handleTopLevelContextMenuOpen}
        >
          {name}
        </button>
      )}
      {isPopupMenuOpen && (
        <PopupMenu
          position={popupMenuPosition}
          entries={popupMenuEntries.current}
        />
      )}
    </div>
  );
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  canTabBeMovedUp: PropTypes.func.isRequired,
  canTabBeMovedDown: PropTypes.func.isRequired,
  onUpdateTabName: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onMoveTabUp: PropTypes.func.isRequired,
  onMoveTabDown: PropTypes.func.isRequired,
};

export default Tab;
