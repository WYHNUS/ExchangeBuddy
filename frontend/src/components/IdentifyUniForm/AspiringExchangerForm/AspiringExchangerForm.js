import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { AutoCompleteFormField } from '../../Field';


let universitiesProps;

const validate = (values) => {
  const errors = {};
  const { homeUniName } = values;

  if (!homeUniName || !homeUniName.length) {
    errors['homeUniName'] = 'Required'
  } else if (universitiesProps && universitiesProps.filter(uni => uni.name === values.homeUniName).length === 0 ) {
    errors['homeUniName'] = 'University not found';
  }
  
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

class AspiringExchangerForm extends React.Component {
  submitForm(val) {
    this.props.attemptLogin(val);
  }

  render() {
    const { universities, handleSubmit } = this.props;
    universitiesProps = universities;

    return (
      <div>
        <form className="select-uni-form" onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <AutoCompleteFormField
              name="homeUniName"
              floatingLabelText="Current university"
              openOnFocus={true}
              filter={ filter }
              maxSearchResults={10}
              dataSource={ universities.map((uni) => uni.name) } 
          />
        </form>
      </div>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'AspiringExchangerForm',
  validate
})(AspiringExchangerForm);