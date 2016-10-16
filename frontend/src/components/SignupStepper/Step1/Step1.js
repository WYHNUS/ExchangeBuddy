import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import { TextFormField, SelectFormField, AutoCompleteFormField } from '../../Field';
import NextButton from '../NextButton';

let universitiesProps;
const validate = values => {
  const errors = {};
  const requiredFields = [ 'displayName', 'gender', 'homeUniName' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  if( universitiesProps && universitiesProps.filter(uni => uni.name === values.homeUniName).length === 0 )
    errors['homeUniName'] = 'University not found'

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


class Step1 extends React.Component {
  submitForm (val, props) {
    props.handleNext();
    this.props.saveData(val);
  }

  render() {
    const { universities, handleNext, handleSubmit, submitting } = this.props;
    universitiesProps = universities;
    
    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values, this.props)
      }) }>
        <Row>
          <Col xs={12}>
            <TextFormField name="displayName" floatingLabelText="Your name" /*{...this.props.initialValues.displayName}*/ />

            <SelectFormField name="gender" floatingLabelText="Gender" /*{...this.props.initialValues.gender}*/>
              <MenuItem value="male" primaryText="Male" />
              <MenuItem value="female" primaryText="Female" />
            </SelectFormField>

            <AutoCompleteFormField
              name="homeUniName"
              floatingLabelText="Current university"
              /*{...this.props.initialValues.homeUniName}*/
              openOnFocus={true}
              filter={ filter }
              maxSearchResults={10}
              dataSource={ universities.map((uni) => uni.name ) } />
          </Col>
        </Row>

        <div style={{ marginTop: 12 }}>
          <NextButton label="Next" disabled={submitting} />
        </div>
      </form>
    );
  }
}

// Step1.propTypes {
//   user:PropTypes.object.isRequired
// }

// Decorate with redux-form
export default reduxForm({
  form: 'signupStep1',
  validate
})(Step1);
