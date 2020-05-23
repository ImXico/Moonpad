import React from 'react';
import PropTypes, { objectOf } from 'prop-types';
import '../styles/app.scss';
import Tab, { TabObjectShape, TabObjectSimpleShape } from './Tab';
import NewTabButton from './NewTabButton';

const TabPaneVisibility = {
  Opening: "opening",
  Open: "open",
  Closing: "closing",
  Closed: "closed"
}

class TabArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibility: props.isOpen ? TabPaneVisibility.Open : TabPaneVisibility.Closed
    }
    // For performance reasons, this component is only mounted and umnounted
    // once throughout each use of the app. When it gets collapsed/expanded,
    // it is not actually being unmounted/mounted; instead, it's appearance
    // is purely manipulated via CSS.
    this.onAnimationStart = this.onAnimationStart.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.canTabBeMovedUp = this.canTabBeMovedUp.bind(this);
    this.canTabBeMovedDown = this.canTabBeMovedDown.bind(this);
    this.onAfterTabDeleted = this.onAfterTabDeleted.bind(this);
  }

  onAnimationStart(event) {
    const animationName = event.animationName;
    if (animationName === "TabsAreaOpening") {
      this.setState({ visibility: TabPaneVisibility.Opening })
    } else if (animationName === "TabsAreaClosing") {
      this.setState({ visibility: TabPaneVisibility.Closing })
    }
  }

  onAnimationEnd(event) {
    const animationName = event.animationName;
    if (animationName === "TabsAreaOpening") {
      this.setState({ visibility: TabPaneVisibility.Open })
    } else if (animationName === "TabsAreaClosing") {
      this.setState({ visibility: TabPaneVisibility.Closed })
    }
  }

  /**
   * A tab can always be moved up except when it is the one with the smallest index already.
   * @param {*} indexOfTabToMoveUp
   */
  canTabBeMovedUp(indexOfTabToMoveUp) {
    const allTabIndexes = this.props.tabs.map(tab => tab.index);
    return allTabIndexes.some(index => index < indexOfTabToMoveUp);
  }

  onTabMovedUp(indexOfTabToMoveUp) {
    
  }

  /**
   * A tab can always be moved down except when it is the one with the highest index already.
   * @param {*} indexOfTabToMoveDown 
   */
  canTabBeMovedDown(indexOfTabToMoveDown) {
    const allTabIndexes = this.props.tabs.map(tab => tab.index);
    return allTabIndexes.some(index => index > indexOfTabToMoveDown);
  }

  onAfterTabDeleted() {
    // TODO: Select some other tab or something
  }

  render() {
    const {
      isOpen,
      tabs,
      onTabSelected,
      currentlySelectedTab,
      onCreateNewTabClicked
    } = this.props;
    return (
      <div
        className={`TabsPane TabsPane--${isOpen ? 'open' : 'closed'}`}
        onAnimationStart={event => this.onAnimationStart(event)}
        onAnimationEnd={event => this.onAnimationEnd(event)}
      >
        <div className="TabsContainer">
          {tabs.map(tab => 
            <Tab
              key={tab.index}
              index={tab.index}
              name={tab.name}
              visibility={this.state.visibility}
              isSelected={tab.index === currentlySelectedTab.index}
              onSelect={onTabSelected}
              canTabBeMovedUp={this.canTabBeMovedUp}
              onTabMoveUp={this.onTabMovedUp}
              canTabBeMovedDown={this.canTabBeMovedDown}
              onAfterTabDeleted={this.onAfterTabDeleted}
            />
          )}
          <NewTabButton onClick={onCreateNewTabClicked} />
          <div className="__tab-area-scroll-past" />
        </div>
      </div>
    );
  }
}

TabArea.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  tabs: PropTypes.arrayOf(objectOf(TabObjectSimpleShape)).isRequired,
  currentlySelectedTab: PropTypes.objectOf(TabObjectShape).isRequired,
  onTabSelected: PropTypes.func.isRequired,
  onCreateNewTabClicked: PropTypes.func.isRequired
}

export default TabArea;