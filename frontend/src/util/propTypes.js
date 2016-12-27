import { PropTypes } from 'react';
const { shape, string, number, instanceOf, arrayOf } = PropTypes;
const dateObject = instanceOf(Date);

// Transformation for react-refetch's "then" callback
const transform = (original, value) => ({ ...original, ...value });

// Standard transformations
const int = parseInt;
// const float = parseFloat;
const date = (x) => new Date(x);
const optional = (val, transform, defaultVal) => {
  if (val !== undefined && val !== null)
    return transform(val);
  else 
    return defaultVal;
};

// Default propType
const defaultPropTypes = {
  createdAt: dateObject,
  updatedAt: dateObject,
};

const defaultTransform = (props) => transform(props, {
  createdAt: optional(props.createdAt, date),
  updatedAt: optional(props.updatedAt, date),
});

const chainTransforms = (...transforms) => (original) => transforms.reduce((p, f) => f(p), original);

export const makeMap = (f) => (x) => x.map(f);

export const countryPropType = shape({
  ...defaultPropTypes,
  alpha2Code: string.isRequired,
  name: string.isRequired,
  region: string,
  capital: string,
});

export const countryTransform = chainTransforms(defaultTransform);

export const universityPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  name: string.isRequired,
  city: string,
  logoImageUrl: string,
  country: countryPropType,
});

export const universityTransform = chainTransforms(defaultTransform, ({ id, country }) => ({
  id: int(id),
  country: optional(country, countryTransform),
}));

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

export const userTransform = chainTransforms(defaultTransform, ({ id, role, University, homeCountry }) => ({
  id: int(id),
  role: optional(role, int, 0),
  university: optional(University, universityTransform),
  homeCountry: optional(homeCountry, countryTransform),
}));

export const groupPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  university: universityPropType.isRequired,
  month: number.isRequired,
  year: number.isRequired,
  users: arrayOf(userPropType).isRequired,
});

export const groupTransform = chainTransforms(defaultTransform, ({ id, University, month, year, users }) => ({
  id: int(id),
  university: universityTransform(University),
  month: int(month),
  year: int(year),
  users: users.map(userTransform),
}));

export const feedPostCommentReplyPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  feedPostCommentId: number.isRequired,
  author: userPropType.isRequired,
});

export const feedPostCommentReplyTransform = chainTransforms(defaultTransform, ({ id, feedPostCommentId, author }) => ({
  id: int(id),
  feedPostCommentId: int(feedPostCommentId),
  author: userTransform(author),
}));

export const feedPostPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  author: userPropType.isRequired,
});

export const feedPostTransform = chainTransforms(defaultTransform, ({ id, author }) => ({
  id: int(id),
  author: userTransform(author),
}));

export const feedPostCommentPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  feedPostId: number.isRequired,
  author: userPropType.isRequired,
  replies: arrayOf(feedPostCommentReplyPropType).isRequired,
});

export const feedPostCommentTransform = chainTransforms(defaultTransform, ({ id, feedPostId, author, replies }) => ({
  id: int(id),
  feedPostId: int(feedPostId),
  author: userTransform(author),
  replies: optional(replies, makeMap(feedPostCommentReplyTransform)),
}));