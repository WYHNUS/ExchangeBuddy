import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

// Initialize configs
// import './config/reactga';
// import './config/cloudinary';
// import './config/facebook';

// Finally, pass to React Router to display components
import Router from './routes.js';

//import './stylesheets/application.scss'; not sure how to import this

// Render the main component into the dom
ReactDOM.render(Router, document.getElementById('react-root'));
