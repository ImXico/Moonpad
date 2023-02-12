import React, { useCallback, useEffect, useRef, useState } from "react";
import { PopupMenu, PopupMenuItemEntry } from "../PopupMenu/PopupMenu";
import { StyledTab, StyledTabInEditMode } from "./styled";

const MENU_OPTION_MOVE_UP = "Move up";
const MENU_OPTION_MOVE_DOWN = "Move down";
const MENU_OPTION_EDIT_NAME = "Edit name";
const MENU_OPTION_DELETE = "Delete";

const POPUP_TOP_TWEAK_PX = 17;
const POPUP_LEFT_TWEAK_PX = 15;

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 12;

type Props = {
  id: string;
  index: number;
  isSelected: boolean;
  name: string;
  // TODO probably doesn't make much sense to still need to pass the id at this level
  canTabBeMovedUp: (index: number) => boolean;
  canTabBeMovedDown: (index: number) => boolean;
  onUpdateTabName: (id: string, newName: string) => void;
  onDelete: (id: string, name: string) => void;
  onSelect: (id: string) => void;
  onMoveTabUp: (id: string) => void;
  onMoveTabDown: (id: string) => void;
};

export function Tab({
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
}: Props) {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isNameBeingEdited, setIsNameBeingEdited] = useState(false);
  const [tabNameInEdition, setTabNameInEdition] = useState("");
  const [popupMenuPosition, setPopupMenuPosition] = useState<{
    top: number | null;
    left: number | null;
  }>({ top: null, left: null });

  const tabRef = useRef<HTMLDivElement>(null);
  const popupMenuEntries = useRef<PopupMenuItemEntry[]>([]);

  const closeAndResetPopupMenu = () => {
    setIsPopupMenuOpen(false);
    setPopupMenuPosition({ top: null, left: null });
  };

  const closeAndResetNameEditMode = () => {
    setIsNameBeingEdited(false);
    setTabNameInEdition("");
  };

  const handleDocumentWideClick = useCallback(
    (event: MouseEvent) => {
      if (tabRef.current && !tabRef.current.contains(event.target as Node)) {
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

  const handleTopLevelContextMenuOpen = () => {
    const ref = tabRef.current;
    if (!ref || !ref.parentElement) {
      return;
    }

    onSelect(id);
    setIsPopupMenuOpen(true);

    const tabsContainerScrollTop = ref.parentElement.scrollTop;
    const top = ref.offsetTop - tabsContainerScrollTop - POPUP_TOP_TWEAK_PX;
    const left = ref.clientWidth + POPUP_LEFT_TWEAK_PX;
    setPopupMenuPosition({ top, left });
  };

  const handleTabNameEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabNameInEdition(event.target.value);
  };

  const handleTabNameEditFinish = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
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
        <StyledTabInEditMode
          as="input"
          type="text"
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          minLength={MIN_NAME_LENGTH}
          maxLength={MAX_NAME_LENGTH}
          value={tabNameInEdition}
          onChange={(event) => handleTabNameEdit(event)}
          onKeyDown={(event) => handleTabNameEditFinish(event)}
        />
      ) : (
        <StyledTab
          isSelected={isSelected}
          type="button"
          onClick={() => onSelect(id)}
          onContextMenu={handleTopLevelContextMenuOpen}
        >
          {name}
        </StyledTab>
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
