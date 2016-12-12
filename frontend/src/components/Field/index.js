import React from 'react';
import { Field } from 'redux-form';
import { TextField, SelectField, AutoComplete } from 'redux-form-material-ui';
import Dropzone from 'react-dropzone';

import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import * as Colors from 'material-ui/styles/colors';

export const TextFormField = ({ name, ...rest }) => {
  return (
    <Field
      component={ TextField }
      name={name}
      fullWidth
      autoComplete="off"
      {...rest} />
  );
}

export const EmailFormField = TextFormField;

export const PasswordFormField = ({ name, ...rest }) => {
  return (
    <Field
      component={ TextField }
      name={name}
      fullWidth
      type="password"
      autoComplete="off"
      {...rest} />
  );
};

export const SelectFormField = ({ name, ...rest }) => 
  <Field
    component={ SelectField }
    name={name}
    fullWidth
    {...rest} />;

export const AutoCompleteFormField = ({ name, ...rest }) =>
  <Field
    component={ AutoComplete }
    name={name}
    fullWidth
    {...rest} />;

const DropzoneField = ({ name, input, meta, ...rest }) => (
  <div className="dropzone-field">
    <Dropzone
      className="dropzone-upload"
      activeClassName="dropzone-active"
      name={ name }
      onDrop={ filesToUpload => input.onChange(filesToUpload) }
      multiple={ false }
      accept="image/*"
      { ...rest }>
      { input.value && Array.isArray(input.value) && input.value.length > 0
        ? <div className="upload-preview">
            <img src={ input.value[0].preview }/>
          </div>
        : <div className="upload-placeholder">
            <Icon name="cloud_upload" size={30} color={ Colors.grey500 } />
            <p>Drag and drop files here or click upload.</p>
          </div> 
        }
    </Dropzone>

    { input.value && Array.isArray(input.value) && input.value.length > 0 &&
      <FlatButton onClick={ (e) => { e.stopPropagation(); input.onChange(null); } } label="Remove Image" icon={ <Icon name="delete" /> } style={{ margin: 10 }} />
    }

    { meta.touched && meta.error && <span className="error">{ meta.error }</span> }
  </div>
);

DropzoneField.propTypes = {
  name: React.PropTypes.string.isRequired,
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
};

export const DropzoneFormField = ({ name, ...rest }) => 
  <Field
    component={ DropzoneField }
    name={ name }
    {...rest} />;