import React from 'react';
import PropTypes from 'prop-types';
import '../styles/app.scss';
import Tab, { TabObjectShape } from './Tab';
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

  render() {
    const {
      isOpen,
      tabNames,
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
          {tabNames.map(name => 
            <Tab
              key={name}
              name={name}
              visibility={this.state.visibility}
              isSelected={name === currentlySelectedTab.name}
              onSelect={onTabSelected}
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
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentlySelectedTab: PropTypes.objectOf(TabObjectShape).isRequired,
  onTabSelected: PropTypes.func.isRequired,
  onCreateNewTabClicked: PropTypes.func.isRequired
}

export default TabArea;