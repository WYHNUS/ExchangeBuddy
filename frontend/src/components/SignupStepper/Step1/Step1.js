import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';

import { Row, Col } from 'react-flexbox-grid';
import MenuItem from 'material-ui/MenuItem';
import { TextFormField, SelectFormField, AutoCompleteFormField } from '../../Field';
import NextButton from '../NextButton';

// import * as SessionHelper from '../../../util/session';

export const fields = [ 'displayName', 'gender', 'homeUniName' ];

// const saveForm = (callback) => {
//   return (values) => {
//     const { displayName, gender, homeUniName } = values;

//     Meteor.call('User.updateProfile', { id: Meteor.userId(), displayName, gender, homeUniName }, (err, result) => {
//       if (!err)
//         SessionHelper.setCurrentUser(callback); // Required so that Meteor.user() will reflect the new user information
//     });
//   };
// };
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
  render() {
    const { universities, fields: { displayName, gender, homeUniName }, handleNext, handleSubmit, submitting } = this.props;
    universitiesProps = universities;

    return (
      <form /*onSubmit={ handleSubmit(saveForm(handleNext)) }*/>
        <Row>
          <Col xs={12}>
            <TextFormField name="displayName" floatingLabelText="Your name" {...displayName} />

            <SelectFormField name="gender" floatingLabelText="Gender" {...gender}>
              <MenuItem value="male" primaryText="Male" />
              <MenuItem value="female" primaryText="Female" />
            </SelectFormField>

          </Col>
        </Row>

        <div style={{ marginTop: 12 }}>
          <NextButton label="Next" disabled={submitting} />
        </div>
      </form>
    );
  }
}

// Step1.propTypes{
//   user:PropTypes.object.isRequired,
// }

            // <AutoCompleteFormField
            //   name="homeUniName"
            //   floatingLabelText="Current university"
            //   {...homeUniName}
            //   openOnFocus={true}
            //   filter={ filter }
            //   maxSearchResults={10}
            //   dataSource={ universities.map((uni) => uni.name ) } />

// Decorate with redux-form
export default reduxForm({
  form: 'signupStep1',
  validate, fields
})(Step1);
