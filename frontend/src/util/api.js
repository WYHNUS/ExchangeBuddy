const nocache = require('superagent-no-cache');
const request = require('superagent');
require('superagent-auth-bearer')(request);

import { getToken } from './bearer';
import { ROOT_URL } from './backend';

const ERROR_NO_USER_TOKEN = new Error('Not logged in.');

export const apiUrl = (endpoint) => {
  return `${ ROOT_URL }${endpoint}`;
};

export const get = (endpoint, params={}, options={}, onSuccess, onError) => {

  options = {
    userToken: false,
    contentType: 'application/json',
    ...options
  };

  const { userToken, contentType } = options;


  let http = request.get(apiUrl(endpoint));

  // userToken
  if (userToken === true) {
    const token = getToken();

    if (token)
      http = http.authBearer(token);
    else
      return onError && onError(ERROR_NO_USER_TOKEN);
  }

  // Query String
  if (params)
    http = http.query(params);

  // Content-Type
  http = http.type(contentType);

  http.type('application/json').set('Accept', 'application/json').use(nocache).end(function(err, res) {
    if (err || res.status != 200) {
      if (onError)
        return onError(err, res);
    } else {
      return onSuccess(res);
    }
  });
};

const postLike = (method, endpoint, params={}, options={}, onSuccess, onError) => {

  options = {
    userToken: true,
    contentType: 'application/json',
    ...options
  };

  const { userToken, contentType } = options;


  let http = method(apiUrl(endpoint));

  // userToken
  if (userToken === true) {
    const token = getToken();

    if (token)
      http = http.authBearer(token);
    else
      return onError && onError(ERROR_NO_USER_TOKEN);
  }

  // Request body
  if (params)
    http = http.send(params);

  // Content-Type
  http = http.type(contentType);

  http.set('Accept', 'application/json').use(nocache).end(function(err, res) {
    if (err || res.status != 200) {
      if (onError)
        return onError(err, res);
    } else {
      return onSuccess(res);
    }
  });

};

export const post = (...args) => postLike(request.post, ...args);
export const del = (...args) => postLike(request.del, ...args);
export const put = (...args) => postLike(request.put, ...args);
export const patch = (...args) => postLike(request.patch, ...args);

export const local = (endpoint) => `localData${endpoint}`;

export const makeReq = (method, url, options) => (values, afterSubmit, failSubmit) => method(url, values, options, afterSubmit, failSubmit);