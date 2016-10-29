import React from 'react';
import { Field } from 'redux-form';
import { TextField, SelectField, AutoComplete } from 'redux-form-material-ui';

export const TextFormField = ({ name, ...rest }) => {
  return <Field
    component={ TextField }
    name={name}
    fullWidth={true}
    autoComplete="off"
    {...rest} />};

export const EmailFormField = TextFormField;

export const PasswordFormField = ({ name, ...rest }) => {
    return <Field
    component={ TextField }
    name={name}
    fullWidth={true}
    type="password"
    autoComplete="off"
    {...rest} />
};

export const SelectFormField = ({ name, ...rest }) =>
  <Field
    component={ SelectField }
    name={name}
    fullWidth={true}
    {...rest} />;

export const AutoCompleteFormField = ({ name, ...rest }) =>
  <Field
    component={ AutoComplete }
    name={name}
    fullWidth={true}
    {...rest} />;
