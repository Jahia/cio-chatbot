import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

window.productBotComponentReactRender = function(target, id, dxContext) {
    ReactDOM.render(<App id={id} dxContext={dxContext}/>, document.getElementById(target));
};