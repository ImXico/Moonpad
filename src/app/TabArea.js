import React from 'react';
import './App.css';
import Tab from './Tab';

const TabArea = ({ isOpen, tabNames, onTabSelected }) => {
  return (
    <div className={isOpen ? "tabAreaOpen" : "tabAreaClosed"}>
      <div className="tabsContainer">
        {tabNames.map(name => 
          <Tab
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