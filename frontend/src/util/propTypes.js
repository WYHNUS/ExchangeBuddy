import { PropTypes } from 'react';

const { shape, string, number, instanceOf, arrayOf } = PropTypes;
const dateObject = instanceOf(Date);

// Transformation for react-refetch's "then" callback

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

const defaultTransform = ({ createdAt, updatedAt }) => ({
  createdAt: optional(createdAt, date),
  updatedAt: optional(updatedAt, date),
});

export const makeMap = (f) => (x) => x.map(f);

export const countryPropType = shape({
  ...defaultPropTypes,
  alpha2Code: string.isRequired,
  name: string.isRequired,
  region: string,
  capital: string,
});

export const countryTransform = ({ ...props }) => ({
  ...props,
  ...defaultTransform(props),
});

export const universityPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  name: string.isRequired,
  city: string,
  logoImageUrl: string,
  country: countryPropType,
});

export const universityTransform = ({ id, CountryAlpha2Code: _, Country, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  country: optional(Country, countryTransform),
});

export const exchangePropType = shape({
  ...defaultPropTypes,
  university: universityPropType.isRequired,
  month: number.isRequired,
  year: number.isRequired,
});

export const exchangeTransform = ({ id, University, UniversityId: _, month, year, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  university: universityTransform(University),
  month: optional(month, int),
  year: optional(year, int),
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
  exchanges: arrayOf(exchangePropType),
});

export const userTransform = ({ id, role, University, homeCountry, Exchanges, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  role: optional(role, int, 0),
  university: optional(University, universityTransform),
  homeCountry: optional(homeCountry, countryTransform),
  exchanges: optional(Exchanges, makeMap(exchangeTransform), []),
});

export const groupPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  exchange: exchangePropType.isRequired,
  users: arrayOf(userPropType).isRequired,
});

export const groupTransform = ({ id, Exchange, users, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  exchange: exchangeTransform(Exchange),
  users: users.map(userTransform),
});

export const feedPostCommentReplyPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  author: userPropType.isRequired,
});

export const feedPostCommentReplyTransform = ({ id, author, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  author: userTransform(author),
});

export const feedPostCommentReactionPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  reaction: string.isRequired,
  author: userPropType.isRequired,
});

export const feedPostCommentReactionTransform = ({ id, author, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  author: userTransform(author),
});

export const feedPostPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  author: userPropType.isRequired,
});

export const feedPostTransform = ({ id, author, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  author: userTransform(author),
});

export const feedPostCommentPropType = shape({
  ...defaultPropTypes,
  id: number.isRequired,
  content: string.isRequired,
  author: userPropType.isRequired,
  replies: arrayOf(feedPostCommentReplyPropType).isRequired,
  reactions: arrayOf(feedPostCommentReactionPropType).isRequired,
});

export const feedPostCommentTransform = ({ id, author, FeedPostCommentReplies, FeedPostCommentReactions, ...props }) => ({
  ...props,
  ...defaultTransform(props),
  id: int(id),
  author: userTransform(author),
  replies: FeedPostCommentReplies.map(feedPostCommentReplyTransform),
  reactions: FeedPostCommentReactions.map(feedPostCommentReactionTransform),
});