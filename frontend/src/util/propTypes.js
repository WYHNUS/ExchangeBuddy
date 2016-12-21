import { PropTypes } from 'react';
const { shape, string, number, instanceOf, arrayOf } = PropTypes;
const date = instanceOf(Date);

const defaultPropTypes = {
  createdAt: date,
  updatedAt: date,
};

export const countryPropType = shape({
  ...defaultPropTypes,
  alpha2Code: string.isRequired,
  name: string.isRequired,
  region: string,
  capital: string,
});

export const universityPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  name: string.isRequired,
  city: string,
  logoImageUrl: string,
  country: countryPropType,
});

export const userPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  name: string.isRequired,
  email: string,
  role: number,
  profilePictureUrl: string,
  fbUserId: string, // big int is too big
  university: universityPropType,
  homeCountry: countryPropType,
});

export const groupPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  university: universityPropType.isRequired,
  month: number.isRequired,
  year: number.isRequired,
  users: arrayOf(userPropType).isRequired,
});

export const feedPostCommentReplyPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  feedPostCommentId:number.isRequired,
  author: userPropType.isRequired,
});

export const feedPostPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  author: userPropType.isRequired,
});

export const feedPostCommentPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  feedPostId: number.isRequired,
  author: userPropType.isRequired,
  replies: arrayOf(feedPostCommentReplyPropType).isRequired,
});
