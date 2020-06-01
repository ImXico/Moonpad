import React from 'react';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
import BottomPaneContainer from '../../containers/BottomPaneContainer';
import './App.scss';

const App = () => (
  <>
    <div className="__working-area-container">
      <TabAreaContainer />
      <div className="__right-pane-area-container">
        <TextAreaContainer />
        <BottomPaneContainer />
      </div>
    </div>
    <div className="__title-bar" />
  </>
);

export default App;
