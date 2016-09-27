import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const Store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

export default Store;
