import React from 'react';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
import './App.scss';

const App = () => (
  <>
    <div className="__working-area-container">
      <TabAreaContainer />
      <div className="__right-pane-area-container">
        <TextAreaContainer />
        <div className="__bottom-bar" />
        {/* <BottomPaneContainer /> */}
      </div>
    </div>
    <div className="__title-bar" />
  </>
);

export default App;
