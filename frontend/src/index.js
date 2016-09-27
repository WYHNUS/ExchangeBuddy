import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/Main';


// Finally, pass to React Router to display components
import Router from './routes.js';

// Render the main component into the dom
ReactDOM.render(Router, document.getElementById('react-root'));
