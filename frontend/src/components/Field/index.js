import React, { createElement } from 'react';
import { Field } from 'redux-form';
import { TextField, SelectField, AutoComplete } from 'redux-form-material-ui';
import Dropzone from 'react-dropzone';

import Icon from 'components/Icon';
import FlatButton from 'material-ui/FlatButton';

import * as Colors from 'material-ui/styles/colors';

const propTypes = {
  name: React.PropTypes.string.isRequired,
};

const createFieldComponent = (RFMUIComponent, props) => {
  class FormField extends React.Component {
    static propTypes = propTypes;

    render() {
      return createElement(Field, {
        component: RFMUIComponent,
        ref: 'formComponent',
        withRef: true,
        ...props,
        ...this.props,
      });
    }

    getFieldComponent() {
      return this.refs.formComponent;
    }
  }

  FormField.displayName = `ReduxFormMaterialUIField${ RFMUIComponent.name }`;
  return FormField;
};

export const TextFormField = createFieldComponent(TextField, { fullWidth: true, autoComplete: 'off' });
export const EmailFormField = createFieldComponent(TextField, { fullWidth: true, autoComplete: 'off' });
export const PasswordFormField = createFieldComponent(TextField, { type: 'password', fullWidth: true, autoComplete: 'off' });
export const SelectFormField = createFieldComponent(SelectField, { fullWidth: true });
export const AutoCompleteFormField = createFieldComponent(AutoComplete, { fullWidth: true });

const DropzoneField = ({ name, input, meta, ...rest }) => { 
  const { value } = input;
  const file = value && Array.isArray(value) && value.length > 0 && value[0];

  return (
    <div className="dropzone-field">
      <Dropzone
        className="dropzone-upload"
        activeClassName="dropzone-active"
        name={ name }
        onDrop={ filesToUpload => input.onChange(filesToUpload) }
        multiple={ false }
        accept="image/*"
        { ...rest }>
        { file && file.preview
          ? <div className="upload-preview">
              <img src={ file && file.preview }/>
            </div>
          : <div className="upload-placeholder">
              <Icon name="cloud_upload" size={30} color={ Colors.grey500 } />
              <p>Drag and drop files here or click upload.</p>
            </div> 
          }
      </Dropzone>

      { file && file.preview && <FlatButton onClick={ (e) => { e.stopPropagation(); input.onChange(null); } } label="Remove Image" icon={ <Icon name="delete" /> } style={{ margin: 10 }} />
      }

      { meta.touched && meta.error && <span className="error">{ meta.error }</span> }
    </div>
  );
};

DropzoneField.propTypes = {
  name: React.PropTypes.string.isRequired,
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
};

export const DropzoneFormField = createFieldComponent(DropzoneField, {});