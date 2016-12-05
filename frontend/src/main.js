import 'core-js/fn/object/assign';
import ReactDOM from 'react-dom';
import Router from './routes.js';

// Run startup scripts
import './startup';

// Main SCSS import
import 'stylesheets/application.scss';

// Render the main component into the dom
ReactDOM.render(Router, document.getElementById('react-root'));
