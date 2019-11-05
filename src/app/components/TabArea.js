import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import Tab from './Tab';

const TabArea = ({ isOpen, tabNames, onTabSelected }) => {
  return (
    <div className={isOpen ? "tabAreaOpen" : "tabAreaClosed"}>
      <div className="tabsContainer">
        {tabNames.map(name => 
          <Tab
            key={name} // Get a proper key
            name={name}
            isOpen={isOpen}
            onSelect={onTabSelected}
          />
        )}
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