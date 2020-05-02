import React from 'react';
import PropTypes from 'prop-types';
import ContextMenu from './framework/ContextMenu';

class Tab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contextMenuOpen: false,
      contextMenuOpeningPosition: undefined
    }
    this.tabRef = React.createRef();
    this.handleContextMenu = this.handleContextMenu.bind(this);
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
   * outside this component in order to close the context menu (if it is open).
   * @param {*} event
   */
  handleDocumentWideClick(event) {
    if (this.state.contextMenuOpen && !this.tabRef.current.contains(event.target)) {
      this.setState({
        contextMenuOpen: false,
        contextMenuOpeningPosition: undefined
      })
    }
  }

  handleContextMenu() {
    // Calculate the top-left corner for the context menu
    const TOP_TWEAK_PX = 10;
    const LEFT_TWEAK_PX = 15;
    const tabsContainerVerticalScroll = this.tabRef.current.parentElement.scrollTop;
    const menuTopInPixels = this.tabRef.current.offsetTop - tabsContainerVerticalScroll - TOP_TWEAK_PX;
    const menuLeftInPixels = this.tabRef.current.clientWidth + LEFT_TWEAK_PX;
    // Update the state with contextMenu visibility + position
    this.setState({ 
      contextMenuOpen: true,
      contextMenuOpeningPosition: {
        top: menuTopInPixels,
        left: menuLeftInPixels
      }
    });
  }

  render() {
    const { name, visibility, isSelected, onSelect } = this.props;
    const { contextMenuOpen, contextMenuOpeningPosition } = this.state;
    const selectedStyle = isSelected ? 'selected' : 'unselected';
    const className = `Tab Tab--${selectedStyle} Tab--${selectedStyle}--${visibility}`;
    return (
      <div ref={this.tabRef}>
        <button
          className={className}
          onClick={() => onSelect(name)}
          onContextMenu={this.handleContextMenu}
        >
          {name}
        </button>
        {contextMenuOpen &&
          <ContextMenu
            position={contextMenuOpeningPosition}
            entries={[
              { text: "Pin tab ", onEntrySelected: () => console.log("Pin tab clicked") },
              { text: "Edit tab name", onEntrySelected: () => console.log("Edit Name clicked") },
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