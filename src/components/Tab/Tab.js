import React from 'react';
import PopupMenu from '../PopupMenu/PopupMenu';
import PropTypes from 'prop-types';
import './Tab.scss';

const MENU_OPTION_MOVE_UP = 'Move up';
const MENU_OPTION_MOVE_DOWN = 'Move down';
const MENU_OPTION_EDIT_NAME = 'Edit name';
const MENU_OPTION_DELETE = 'Delete';

class Tab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopupMenuOpen: false,
      popupMenuOpeningPosition: undefined,
      isNameBeingEdited: false,
      tabNameInEditionValue: ""
    }

    this.tabRef = React.createRef();
    this.closeAndResetPopupMenu = this.closeAndResetPopupMenu.bind(this);
    this.closeAndResetNameEditMode = this.closeAndResetNameEditMode.bind(this);
    this.calculatePopupElementPosition = this.calculatePopupMenuPosition.bind(this);
    this.handleTopLevelContextMenuOpen = this.handleTopLevelContextMenuOpen.bind(this);
    this.handleDocumentWideClick = this.handleDocumentWideClick.bind(this);
    this.handleTabNameEdit = this.handleTabNameEdit.bind(this);
    this.handleTabNameEditFinish = this.handleTabNameEditFinish.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDocumentWideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentWideClick, false);
  }

  componentDidUpdate(prevProps) {
    if (this.popupMenuEntries && (prevProps.index === this.props.index)) {
      return;
    }

    this.popupMenuEntries = [
      {
        text: MENU_OPTION_MOVE_UP,
        isEnabled: this.props.canTabBeMovedUp(this.props.index),
        onEntrySelected: () => {
          this.props.onMoveTabUp(this.props.id);
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: MENU_OPTION_MOVE_DOWN,
        isEnabled: this.props.canTabBeMovedDown(this.props.index),
        onEntrySelected: () => {
          this.props.onMoveTabDown(this.props.id);
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: MENU_OPTION_EDIT_NAME,
        isEnabled: true,
        onEntrySelected: () => {
          this.setState({ isNameBeingEdited: true });
          this.closeAndResetPopupMenu();
        }
      },
      {
        text: MENU_OPTION_DELETE,
        isEnabled: true,
        onEntrySelected: () => {
          this.props.onDelete(this.props.id);
          this.closeAndResetPopupMenu();
        }
      },
    ]
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

  calculatePopupMenuPosition() {
    const TOP_TWEAK_PX = 17;
    const LEFT_TWEAK_PX = 15;
    const ref = this.tabRef.current;
    const tabsContainerVerticalScroll = ref.parentElement.scrollTop;
    const top = ref.offsetTop - tabsContainerVerticalScroll - TOP_TWEAK_PX;
    const left = ref.clientWidth + LEFT_TWEAK_PX;
    return { top, left };
  }

  handleTopLevelContextMenuOpen() {
    const { top, left } = this.calculatePopupMenuPosition();
    this.setState({ 
      isPopupMenuOpen: true,
      popupMenuOpeningPosition: { top, left }
    });
  }

  handleTabNameEdit(event) {
    this.setState({
      tabNameInEditionValue: event.target.value
    });
  }

  handleTabNameEditFinish(event) {
    if (event.key === 'Enter') {
      const newName = this.state.tabNameInEditionValue;
      this.setState({
        isNameBeingEdited: false,
        tabNameInEditionValue: ""
      });
      this.props.onUpdateTabName(this.props.id, newName);
    } else if (event.key === 'Escape') {
      this.closeAndResetNameEditMode();
    }
  }

  render() {
    const { id, name, isSelected, onSelect } = this.props;
    const {
      isPopupMenuOpen,
      popupMenuOpeningPosition,
      isNameBeingEdited,
      tabNameInEditionValue
    } = this.state;

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
              className={`Tab Tab--${isSelected ? 'selected' : 'unselected'}`}
              onClick={() => onSelect(id)}
              onContextMenu={this.handleTopLevelContextMenuOpen}
            >
              {name}
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
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  canTabBeMovedUp: PropTypes.func.isRequired,
  canTabBeMovedDown: PropTypes.func.isRequired,
  onUpdateTabName: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onMoveTabUp: PropTypes.func.isRequired,
  onMoveTabDown: PropTypes.func.isRequired
}

export default Tab;