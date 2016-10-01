import { Meteor } from 'meteor/meteor';

ReactGA = require('react-ga');

if (Meteor.settings.public.GoogleAnalytics)
  ReactGA.initialize(Meteor.settings.public.GoogleAnalytics.trackingId);
