import React from 'react';
// import BottomPaneContainer from './BottomPane';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
import './App.scss';

const App = () => (
  <>
    <div className="__title-bar"></div>
    <div className="__working-area-container">
      <TabAreaContainer />
      <div className="__right-pane-area-container">
        <TextAreaContainer />
        {/* <BottomPaneContainer /> */}
      </div>
    </div>
  </>
);

export default App;
