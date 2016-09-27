import { getUrlScale } from './images';

export const getImageUrl = (item, size=64) => item.imageId ? getUrlScale(item.imageId, size) : item.section && item.section.defaultImageId ? getUrlScale(item.section.defaultImageId, size) : null;
export const getSectionSubtitle = (item, group=null) => {
  const subtitle = item.section.subtitle;
  const country = item.country;
  const university = group.university;

  if (!subtitle)
    return "";
  else if (!group)
    return subtitle;

  return subtitle
    .replace("$COUNTRY", country && country.name)
    .replace("$UNIVERSITY", university && university.name)
    .replace("$USERNAME", Meteor.user() && Meteor.user().displayName);
};
