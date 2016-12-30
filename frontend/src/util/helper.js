import moment from 'moment';

// Routes
export const makeRouteSlug = (routes) => {
  return routes.map(route => route.path).filter(route => route && route != '/' && route.substr(0, 1) != ':').join('-');
};

/**
 * Checks if a deeply nested property exists.
 * Takes in an array of properties, where each subsequent element is a property of the previous element.
 *
 * For example,
 *     propExistsDeep(object, ['property', 'really', 'deep', 'inside'])
 * returns true if
 *     object.property.really.deep.inside exists.
 */
export const propExistsDeep = function(parent, arrayOfChildProps) {
  if (!parent)
    return false;

  if (!arrayOfChildProps)
    return true;

  let object = parent;
  return arrayOfChildProps.every(function(prop) {
    if (!object.hasOwnProperty(prop))
      return false;
    object = object[prop];
    return true;
  });
};

/**
 * Deletes a named object property from an object.
 * 
 * @param  {object} obj  Object to operate on.
 * @param  {string} prop Property name to delete, if exists.
 * @return {object}      Resultant object.
 */
export const deleteProp = (obj, prop) => {
  if (prop in obj)
    delete obj[prop];

  return obj;
};

// Numbers
export const formatMoney = (money) => `$${ money.toFixed(2) }`;

// Dates
export const formatDate = (date) => moment(date).format('D MMM YYYY');
export const formatMonth = (month) => month.charAt(0).toUpperCase() + month.toLowerCase().slice(1);
export const formatTime = (date) => moment(date).format('h:mm A');
export const formatDateTime = (date) => moment(date).format('ddd, D MMM, h:mm A');
export const formatRelaTime = (date) => moment(date).fromNow()
export const isFuture = (startDate, endDate) => moment(startDate).isAfter(moment()) && moment(endDate).isAfter(moment());
export const isOver = (startDate, endDate) => moment(startDate).isBefore(moment()) && moment(endDate).isBefore(moment());
export const isOngoing = (startDate, endDate) => moment(startDate).isBefore(moment()) && moment(endDate).isAfter(moment());
export const getMinDate = (dates) => Math.min.apply(null, dates);
export const getMaxDate = (dates) => Math.max.apply(null, dates);

// Lambda iterator
export const iterate = (n) => {
  let start = 0;
  let end = n;

  const iterator = {
    map(fn) {
      const ret = [];
      for (let i = start; i < end; i++) ret.push(fn(i));
      return ret;
    },
    toArray: () => iterator.map(x => x),
  };

  return iterator;
};

// Icons
export const availableEmojis = [
  'heart-eyes',
  'yum',
  'joy',
  'two-hearts',
  'cry',
];