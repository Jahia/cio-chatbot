import React from 'react';
import ReactDOM from 'react-dom';
/* import Test from './TestComp.jsx'; */
import App from './App.jsx';

window.testComponentReactRender = function(target, id, dxContext) {
    ReactDOM.render(<App id={id} dxContext={dxContext}/>, document.getElementById(target));
};