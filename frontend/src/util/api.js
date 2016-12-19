const nocache = require('superagent-no-cache');
const request = require('superagent');
require('superagent-auth-bearer')(request);

import { getUserToken } from './session';
export const ROOT_URL = process.env.API_ROOT_URL;

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
    const token = getUserToken();

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
    const token = getUserToken();

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

export const makeRefetch = (url, options, transformations) => {
  const refetcher = {};

  refetcher.url = ROOT_URL + url;
  refetcher.headers = {};

  options = { userToken: false, ...options };
  const { userToken } = options;

  if (userToken === true) {
    refetcher.headers.Authorization = 'Bearer ' + getUserToken();
  }

  if (transformations && Array.isArray(transformations))
    refetcher.then = (value) => ({ value: transformations.reduce((p, f) => f(p), value) });

  return refetcher;
};