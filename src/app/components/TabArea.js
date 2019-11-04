import React from 'react';
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

export default TabArea;