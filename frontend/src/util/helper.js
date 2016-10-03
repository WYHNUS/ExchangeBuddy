// Routes
export const makeRouteSlug = (routes) => {
  return routes.map(route => route.path).filter(route => route && route != '/' && route.substr(0, 1) != ':').join('-');
};