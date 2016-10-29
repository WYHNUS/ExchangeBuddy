import React from 'react';
import { reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import validator from 'validator';
import { browserHistory } from 'react-router';

import { TextFormField, SelectFormField, AutoCompleteFormField } from '../Field';


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let universitiesProps;

const validate = values => {
  const errors = {};
  const requiredFields = [ 'homeUniName', 'exchangeUniName', 'exchangeUniYear', 'exchangeTerm' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  if (universitiesProps && universitiesProps.filter(uni => uni.name === values.homeUniName).length === 0 ) {
    errors['homeUniName'] = 'University not found';
  }
  if (universitiesProps && universitiesProps.filter(uni => uni.name === values.exchangeUniName).length === 0 ) {
    errors['exchangeUniName'] = 'University not found';
  }
  if (!!values.homeUniName && !!values.homeUniName.length>1 && values.exchangeUniName === values.homeUniName) {
    errors['exchangeUniName'] = 'Are you sure your Home University and Exchange University are the same? :)';
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

class IdentifyUniForm extends React.Component {
  componentWillMount() {
    this.props.fetchAllUniversities();
  }

  submitForm(val) {
    console.log(val);
    // this.props.updateUserProfile(val);
  }

  render() {
    const { handleSubmit, submitting, loginError } = this.props;
    const { universities } = this.props.universitiesList;

    universitiesProps = universities;

    // Year of exchange
    const year = new Date().getFullYear();
    const years = [];
    for (var i = year - 1; i < year + 5; i++ ) {
      years.push(i);
    }

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
              dataSource={ universities.map((uni) => uni.name) } 
          />
        
          <AutoCompleteFormField
            id="exchangeUniName"
            name="exchangeUniName"
            floatingLabelText="Your exchange university"
            openOnFocus={true}
            filter={ filter }
            maxSearchResults={10}
            dataSource={ universities.map((uni) => uni.name ) } 
          />

          <SelectFormField
            name="exchangeUniYear"
            floatingLabelText="Start year of exchange">
            { years.map(year => <MenuItem key={year} value={year} primaryText={year} />) }
          </SelectFormField>

          <SelectFormField
            name="exchangeTerm"
            floatingLabelText="Start month of exchange">
            { monthNames.map(month => <MenuItem key={month} value={month} primaryText={month} />) }
          </SelectFormField>

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