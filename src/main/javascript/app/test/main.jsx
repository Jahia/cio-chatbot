import React from 'react';
import ReactDOM from 'react-dom';
/* import Test from './app.jsx'; */
import App from './App.js';

window.testComponentReactRender = function(target, id, dxContext) {
    ReactDOM.render(<App id={id} dxContext={dxContext}/>, document.getElementById(target));
};