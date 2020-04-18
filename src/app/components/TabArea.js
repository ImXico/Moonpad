import React from 'react';
import PropTypes from 'prop-types';
import '../styles/app.scss';
import Tab from './Tab';
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
              isSelected={name === currentlySelectedTab}
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
  currentlySelectedTab: PropTypes.string.isRequired,
  onTabSelected: PropTypes.func.isRequired,
  onCreateNewTabClicked: PropTypes.func.isRequired
}

export default TabArea;