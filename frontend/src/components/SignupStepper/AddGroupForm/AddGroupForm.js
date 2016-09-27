import React from 'react';
import { reduxForm } from 'redux-form';

import { Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import { TextFormField, SelectFormField, AutoCompleteFormField } from '../../Field';
import NextButton from '../NextButton';
import ExchangeTermSelect from '../Step2/ExchangeTermSelect';

import { propExistsDeep } from '../../../../util/helper';

export const fields = [ 'exchangeUniName', 'exchangeUniYear', 'exchangeTerm' ];

const saveForm = (callback) => {
  return (values) => {
    const { exchangeUniName, exchangeUniYear, exchangeTerm } = values;

    Meteor.call('UserGroup.addUserToGroup', { userId: Meteor.userId(), exchangeUniName, exchangeUniYear, exchangeTerm }, (err, result) => {
      if (err)
        console.log("Error in invoking UserGroup.addUserToGroup: " + err);
      else if (callback)
        callback(result);
    });
  };
};

const validate = values => {
  const errors = {};
  const requiredFields = [ 'exchangeUniName', 'exchangeUniYear', 'exchangeTerm' ];
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

class Step2 extends React.Component {
  render() {
    const { universities, submitFormHandler, handleSubmit, submitting, formState } = this.props;

    // Year of exchange
    const year = new Date().getFullYear();
    const years = [];
    let i;
    for ( i = year - 1; i < year + 5; i++ )
      years.push(i);

    // Uni name
    const uniName = propExistsDeep(formState, [ 'addGroupForm', 'values', 'exchangeUniName' ]) && formState.addGroupForm.values.exchangeUniName;

    return (
      <form onSubmit={ handleSubmit(saveForm(submitFormHandler)) }>

        <AutoCompleteFormField
          id="exchangeUniName"
          name="exchangeUniName"
          floatingLabelText="Your exchange university"
          openOnFocus={true}
          filter={ filter }
          maxSearchResults={10}
          dataSource={ universities.map((uni) => uni.name ) } />

        <SelectFormField
          name="exchangeUniYear"
          floatingLabelText="Start year of exchange">
          { years.map(year => <MenuItem key={year} value={year} primaryText={year} />) }
        </SelectFormField>

        <ExchangeTermSelect uniName={ uniName } />

        <div style={{ marginTop: 12 }}>
          <NextButton label="Add Group" disabled={submitting} />
        </div>
      </form>
    );
  }
}


// Decorate with redux-form
export default reduxForm({
  form: 'addGroupForm',
  validate, fields
})(Step2);
