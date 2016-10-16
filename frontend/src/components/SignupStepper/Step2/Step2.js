import React from 'react';
import { reduxForm } from 'redux-form';

import { Grid, Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import { TextFormField, SelectFormField, AutoCompleteFormField } from '../../Field';
import PrevButton from '../PrevButton';
import NextButton from '../NextButton';
import ExchangeTermSelect from '../ExchangeTermSelect';

import { propExistsDeep } from '../../../util/helper';

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
  submitForm (val, props) {
    props.handleNext();
    this.props.saveData(val);
  }

  render() {
    const { universities, handleNext, handlePrev, handleSubmit, submitting, formState } = this.props;

    // Year of exchange
    const year = new Date().getFullYear();
    const years = [];
    let i;
    for ( i = year - 1; i < year + 5; i++ )
      years.push(i);

    // Uni name
    const uniName = propExistsDeep(formState, [ 'signupStep2', 'values', 'exchangeUniName' ]) && formState.signupStep2.values.exchangeUniName;

    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values, this.props)
      }) }>
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
          <PrevButton onTouchTap={ handlePrev } label="Back" disabled={submitting} />
          <NextButton label="Next" disabled={submitting} />
        </div>
      </form>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'signupStep2',
  validate
})(Step2);
