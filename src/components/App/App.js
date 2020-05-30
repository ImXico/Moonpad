import React from 'react';
import BottomPane from '../BottomPane/BottomPane';
import TabAreaContainer from '../../containers/TabAreaContainer';
import TextAreaContainer from '../../containers/TextAreaContainer';
import './App.scss';

const App = () => (
  <>
    <div className="__working-area-container">
      <TabAreaContainer />
      <div className="__right-pane-area-container">
        <TextAreaContainer />
        <BottomPane />
      </div>
    </div>
    <div className="__title-bar" />
  </>
);

export default App;
