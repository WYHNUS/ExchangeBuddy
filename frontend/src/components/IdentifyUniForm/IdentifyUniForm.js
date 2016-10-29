import React from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import { browserHistory } from 'react-router';

import { TextFormField, SelectFormField, AutoCompleteFormField } from '../Field';

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'homeUniName' ];
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  
  return errors;
};

const filter = (searchText, key) => {
  searchText = searchText.toLowerCase();
  key = key.toLowerCase().replace(/[^a-z0-9 ]/g, '');

  if (searchText.length < 3)
    return false;

  return searchText.split(' ').every(searchTextSubstring =>
    key.split(' ').some(s => s.substr(0, searchTextSubstring.length) == searchTextSubstring)
  );
};

class IdentifyUniForm extends React.Component {
  submitForm(val) {
    console.log(val);
    // this.props.updateUserProfile(val);
  }

  render() {
    const { handleSubmit, submitting, loginError } = this.props;
    const { universities } = this.props.universitiesList;

    return (
      <div>
        <form onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <AutoCompleteFormField
              name="homeUniName"
              floatingLabelText="Current university"
              openOnFocus={true}
              filter={ filter }
              maxSearchResults={10}
              dataSource={ universities.map((uni) => uni.name) } />
        </form>

        { submitting ? <p>Logging in... Please be patient. :)</p> : null }

        { 
          loginError ? 
            loginError.error ?
              <p>{ loginError.error }</p> 
            : <p>{ loginError }</p> 
          : null
        }
      </div>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'IdentifyUniForm',
  validate
})(IdentifyUniForm);