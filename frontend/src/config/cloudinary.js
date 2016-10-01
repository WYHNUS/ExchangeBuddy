import { Meteor } from 'meteor/meteor';

$.cloudinary.config({
  cloud_name: Meteor.settings.public.Cloudinary.cloudName
});
