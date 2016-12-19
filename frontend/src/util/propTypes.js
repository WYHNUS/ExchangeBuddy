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
});