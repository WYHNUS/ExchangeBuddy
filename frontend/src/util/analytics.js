import { Meteor } from 'meteor/meteor';

const setParams = (path="", callback=null) => {
  // Allow custom path, otherwise use current URL
  if (!path || !path.length)
    path = window.location.pathname;

  // Set URL
  ReactGA.set({ page: path });

  // Set Meteor userId, if present
  if (Meteor.userId())
    ReactGA.set({ userId: Meteor.userId() });
  else
    ReactGA.set({ userId: null });

  if (callback)
    callback();
};

export const logPageView = () => {
  setParams("", () => {
    ReactGA.pageview(window.location.pathname);
  });
};

// Requires a custom path to be provided for the modal,
// and should not coincide with existing URLs.
export const logModalView = (path) => {
  setParams(path, () => {
    ReactGA.modalview(path);
  });
};
