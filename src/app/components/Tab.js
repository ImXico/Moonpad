import React from 'react';
import PropTypes from 'prop-types';
import PopupMenu from './framework/PopupMenu/PopupMenu';

const { ipcRenderer } = window.require('electron');

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
    this.handlePotentialTabNameEditFinish = this.handlePotentialTabNameEditFinish.bind(this);
    this.popupMenuEntries = [
      {
        text: "Move up",
        onEntrySelected: () => {
          // TODO
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: "Move down",
        onEntrySelected: () => {
          // TODO
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: "Edit name",
        onEntrySelected: () => {
          this.setState({ isNameBeingEdited: true });
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: "Delete tab",
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
    // TODO: If we're too close to the vertical bounds of the screen, auto-scroll a bit
    const { top, left } = this.calculatePopupElementPosition();
    this.setState({ 
      isPopupMenuOpen: true,
      popupMenuOpeningPosition: { top, left }
    });
  }

  handleTabNameEdit(event) {
    this.setState({ tabNameInEditionValue: event.target.value });
  }

  handlePotentialTabNameEditFinish(event) {
    if (event.key === 'Enter') {
      this.setState({ isNameBeingEdited: false, tabName: this.state.tabNameInEditionValue });
      // We need to save update the tab's new name in the file we're reading from
      ipcRenderer.send(UPDATE_TAB_NAME, {
        nameOfTabToBeUpdated: this.props.activeTabName,
        updatedContent: this.state.textContent
      });
    } else if (event.key === 'Escape') {
      this.closeAndResetNameEditMode();
    }
  }

  saveUpdatedContent() {
    
  }

  render() {
    const { visibility, isSelected, onSelect } = this.props;
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
              onKeyDown={event => this.handlePotentialTabNameEditFinish(event)}
            />
          : <button
              className={className}
              onClick={() => onSelect(tabName)}
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
  name: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired
}

export default Tab;