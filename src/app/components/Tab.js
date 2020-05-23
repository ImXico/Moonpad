import React from 'react';
import PropTypes from 'prop-types';
import PopupMenu from './framework/PopupMenu/PopupMenu';
import { UPDATE_TAB_NAME } from '../data/ipc-actions';
const { ipcRenderer } = window.require('electron');

export const TabObjectShape = {
  index: PropTypes.number,
  name: PropTypes.string,
  content: PropTypes.string
}

export const TabObjectSimpleShape = {
  index: PropTypes.number,
  name: PropTypes.string,
}

class Tab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabName: props.name,
      isPopupMenuOpen: false,
      popupMenuOpeningPosition: undefined,
      isNameBeingEdited: false,
      tabNameInEditionValue: ""
    }

    this.tabRef = React.createRef();
    this.closeAndResetPopupMenu = this.closeAndResetPopupMenu.bind(this);
    this.closeAndResetNameEditMode = this.closeAndResetNameEditMode.bind(this);
    this.calculatePopupElementPosition = this.calculatePopupElementPosition.bind(this);
    this.handleTopLevelContextMenuOpen = this.handleTopLevelContextMenuOpen.bind(this);
    this.handleDocumentWideClick = this.handleDocumentWideClick.bind(this);
    this.handleTabNameEdit = this.handleTabNameEdit.bind(this);
    this.handleTabNameEditFinish = this.handleTabNameEditFinish.bind(this);
    this.popupMenuEntries = [
      {
        text: "Move up",
        isEnabled: this.props.canTabBeMovedUp(this.props.index),
        onEntrySelected: () => {
          this.props.onTabMovedUp(this.props.index);
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: "Move down",
        isEnabled: this.props.canTabBeMovedDown(this.props.index),
        onEntrySelected: () => {
          // TODO
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: "Edit name",
        isEnabled: true,
        onEntrySelected: () => {
          this.setState({ isNameBeingEdited: true });
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: "Delete tab",
        isEnabled: true,
        onEntrySelected: () => {
          // TODO
          this.closeAndResetPopupMenu();
        }
      },
    ]
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDocumentWideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentWideClick, false);
  }

  /**
   * This is a bit of a hack: we need to check if there was a click
   * outside this component in order to close any context menu that is open.
   * We also use it to cancel out a "tab in edition" operation, if it is being done.
   * @param {*} event the mousedown event fired
   */
  handleDocumentWideClick(event) {
    if (!this.tabRef.current.contains(event.target)) {
      if (this.state.isPopupMenuOpen) {
        this.closeAndResetPopupMenu();
      }
      if (this.state.isNameBeingEdited) {
        this.closeAndResetNameEditMode();
      }
    }
  }

  closeAndResetPopupMenu() {
    this.setState({
      isPopupMenuOpen: false,
      popupMenuOpeningPosition: undefined
    });
  }

  closeAndResetNameEditMode() {
    this.setState({
      isNameBeingEdited: false,
      tabNameInEditionValue: ""
    })
  }

  calculatePopupElementPosition() {
    const TOP_TWEAK_PX = 17;
    const LEFT_TWEAK_PX = 15;
    const ref = this.tabRef.current;
    const tabsContainerVerticalScroll = ref.parentElement.scrollTop;
    const top = ref.offsetTop - tabsContainerVerticalScroll - TOP_TWEAK_PX;
    const left = ref.clientWidth + LEFT_TWEAK_PX;
    return { top, left  };
  }

  handleTopLevelContextMenuOpen() {
    // TODO: If we're too close to the vertical bounds of the window, auto-scroll a bit
    const { top, left } = this.calculatePopupElementPosition();
    this.setState({ 
      isPopupMenuOpen: true,
      popupMenuOpeningPosition: { top, left }
    });
  }

  handleTabNameEdit(event) {
    this.setState({ tabNameInEditionValue: event.target.value });
  }

  handleTabNameEditFinish(event) {
    if (event.key === 'Enter') {
      const newName = this.state.tabNameInEditionValue;
      this.setState({
        isNameBeingEdited: false,
        tabName: newName,
        tabNameInEditionValue: ""
      });
      // We need to persist those changes in the database
      ipcRenderer.send(UPDATE_TAB_NAME, {
        oldName: this.props.name,
        newName: newName
      });
    } else if (event.key === 'Escape') {
      this.closeAndResetNameEditMode();
    }
  }

  render() {
    const { index, visibility, isSelected, onSelect } = this.props;
    const {
      tabName,
      isPopupMenuOpen,
      popupMenuOpeningPosition,
      isNameBeingEdited,
      tabNameInEditionValue
    } = this.state;
    const selectedStyle = isSelected ? 'selected' : 'unselected';
    const className = `Tab Tab--${selectedStyle} Tab--${selectedStyle}--${visibility}`;
    return (
      <div ref={this.tabRef}>
        {isNameBeingEdited
          ? <input
              className={"Tab Tab--editing-name"}
              autoFocus
              type="text"
              minLength={1}
              maxLength={12}
              value={tabNameInEditionValue}
              onChange={event => this.handleTabNameEdit(event)}
              onKeyDown={event => this.handleTabNameEditFinish(event)}
            />
          : <button
              className={className}
              onClick={() => onSelect(index)}
              onContextMenu={this.handleTopLevelContextMenuOpen}
            >
              {tabName}
            </button>
        }
        {isPopupMenuOpen &&
          <PopupMenu
            position={popupMenuOpeningPosition}
            entries={this.popupMenuEntries}
          />
        }
      </div>
    );
  }
}

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  canTabBeMovedUp: PropTypes.func.isRequired,
  onTabMovedUp: PropTypes.func.isRequired,
  canTabBeMovedDown: PropTypes.func.isRequired,
  onAfterTabDeleted: PropTypes.func.isRequired,
}

export default Tab;