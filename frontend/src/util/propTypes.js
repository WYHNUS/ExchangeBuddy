import { PropTypes } from 'react';
const { shape, string, number } = PropTypes;

export const countryPropType = shape({
  alpha2Code: string.isRequired,
  name: string.isRequired,
  region: string,
  capital: string,
});

export const universityPropType = shape({
  id: number.isRequired,
  name: string.isRequired,
  city: string,
  logoImageUrl: string,
  country: countryPropType,
});

export const groupPropType = shape({
  id: number.isRequired,
  university: universityPropType.isRequired,
});

export const userPropType = shape({
  id: number.isRequired,
  name: string.isRequired,
  email: string,
  role: number,
  profilePictureUrl: string,
  fbUserId: string, // big int is too big
  university: universityPropType,
});