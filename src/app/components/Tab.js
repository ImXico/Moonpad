import React from 'react';
import PropTypes from 'prop-types';
import PopupMenu from './framework/PopupMenu/PopupMenu';

class Tab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopupMenuOpen: false,
      popupMenuOpeningPosition: undefined
    }
    this.tabRef = React.createRef();
    this.calculatePopupElementPosition = this.calculatePopupElementPosition.bind(this);
    this.handleTopLevelContextMenuOpen = this.handleTopLevelContextMenuOpen.bind(this);
    this.handleDocumentWideClick = this.handleDocumentWideClick.bind(this);
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
   * @param {*} event the mousedown event fired
   */
  handleDocumentWideClick(event) {
    if (this.state.isPopupMenuOpen && !this.tabRef.current.contains(event.target)) {
      this.setState({
        isPopupMenuOpen: false,
        popupMenuOpeningPosition: undefined
      })
    }
  }

  calculatePopupElementPosition() {
    const TOP_TWEAK_PX = 10;
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

  render() {
    const { name, visibility, isSelected, onSelect } = this.props;
    const { isPopupMenuOpen, popupMenuOpeningPosition } = this.state;
    const selectedStyle = isSelected ? 'selected' : 'unselected';
    const className = `Tab Tab--${selectedStyle} Tab--${selectedStyle}--${visibility}`;
    return (
      <div ref={this.tabRef}>
        <button
          className={className}
          onClick={() => onSelect(name)}
          onContextMenu={this.handleTopLevelContextMenuOpen}
        >
          {name}
        </button>
        {isPopupMenuOpen &&
          <PopupMenu
            position={popupMenuOpeningPosition}
            entries={[
              { text: "Move to top ", onEntrySelected: () => console.log("Move to top clicked") },
              { text: "Edit name", onEntrySelected: () => console.log("Edit Name clicked") },
              { text: "Delete tab", onEntrySelected: () => console.log("Delete clicked") },
            ]}
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
  onSelect: PropTypes.func.isRequired
}

export default Tab;