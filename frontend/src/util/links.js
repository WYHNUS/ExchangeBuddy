import { browserHistory } from 'react-router';

export const redirect = (path = '/') => browserHistory.push(path);