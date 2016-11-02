import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { SelectFormField, AutoCompleteFormField } from '../../Field';
import MenuItem from 'material-ui/MenuItem';



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

class CompleteExchangeForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      submitted: false
    }
  }

  componentDidUpdate() {
    const { fetchingAuthUpdate, error } = this.props.updateStatus;
    if (!!this.props.user.UniversityId && !fetchingAuthUpdate && !error) {
      if(!(window.location.pathname.split('/')[1]==="profile")){
        browserHistory.push('/home');
      }else{
        if(this.state.submitted){
          browserHistory.push('/profile');
          this.props.showSnackbar('Universties have been updated!');
        }
      }
    }
  }

  submitForm(val) {
    const { user, universities } = this.props;
    var homeUniId, exchangeUniId;
    for (var i=0; i<universities.length; i++) {
      if (universities[i].name === val.homeUniName) {
        homeUniId = universities[i].id;
      }
      if (universities[i].name === val.exchangeUniName) {
        exchangeUniId = universities[i].id;
        this.setState({...this.state, submitted:true});
      }
    }

    this.props.updateUniInfo(user.id, homeUniId, exchangeUniId, val.exchangeUniYear, val.exchangeTerm);
  }

  render() {
    const { universities, years, handleSubmit } = this.props;
    const { fetchingAuthUpdate, error } = this.props.updateStatus;
    universitiesProps = universities;

    return (
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

        <div style={{ marginTop: 12 }}>
          <RaisedButton
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            type="submit"
            style={{ margin: 6 }}
            label="Submit" 
            disabled={fetchingAuthUpdate}
          />
        </div>

        { fetchingAuthUpdate ? <p>Updating... Please be patient. :)</p> : null }

        { 
          error ? 
            error.error ?
              <p>{ error.error }</p> 
            : <p>{ error }</p> 
          : null
        }
      </form>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'CompleteExchangeForm',
  validate
})(CompleteExchangeForm);