import React from 'react';
import PropTypes from 'prop-types';
import '../styles/app.scss';
import Tab from './Tab';
import NewTabButton from './NewTabButton';

const TabArea = ({ isOpen, tabNames, onTabSelected, onCreateNewTabClicked }) => {
  return (
    <div className={`TabsPane TabsPane--${isOpen ? 'open' : 'closed'}`}>
      <div className="TabsContainer">
        {tabNames.map(name => 
          <Tab
            key={name}
            name={name}
            isOpen={isOpen}
            onSelect={onTabSelected}
          />
        )}
        <NewTabButton onClick={onCreateNewTabClicked} />
      </div>
    </div>
  );
}

TabArea.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTabSelected: PropTypes.func.isRequired
}

export default TabArea;