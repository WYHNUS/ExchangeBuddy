
// Dates
// export const formatDate = (date) => moment(date).format('"D MMM YYYY');
// export const formatTime = (date) => moment(date).format('h:mm A');

// Routes
export const makeRouteSlug = (routes) => {
  return routes.map(route => route.path).filter(route => route && route != '/' && route.substr(0, 1) != ':').join('-');
};

// Objects

/**
 * Maps object properties using a given function.
 * @param  {Object}   obj   Target object
 * @param  {Function} fn    Mapping function that takes in an object property value, and returns a new value to be assigned.
 *                          Method signature:
 *                            function(value, key: string) => newValue
 * @return {Object}         Newly constructed object with mapped properties. Original object is not modified.
 */
export const mapObjPropsToObject = function(obj, fn) {
  if (!fn)
    fn = (x) => x;

  return Object.keys(obj).reduce(function(accum, curr) {
    accum[curr] = fn(obj[curr], curr);
    return accum;
  }, {});
};

export const mapObjPropsToArray = function(obj, fn) {
  if (!fn)
    fn = (x) => x;

  return Object.keys(obj).map((key) => {
    return fn(obj[key], key);
  });
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

export const convertToSlug = (Text) => {
  return Text.toLowerCase().replace(/[^\w ]+/g,' ').split(' ').filter(s => s.length).join('-');
};

export const titleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// Pluralizer
export const pluralizer = (number, singular, plural) => number === 1 ? singular : plural;
