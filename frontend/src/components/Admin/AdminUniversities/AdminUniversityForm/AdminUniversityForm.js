import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { TextFormField, SelectFormField, DropzoneFormField } from 'components/Field';

import { universityPropType, countryPropType } from 'util/propTypes';

const validate = values => {
  const errors = {};

  // Required fields
  const requiredFields = ['universityName', 'countryCode'];
  requiredFields.forEach(field => {
    if (!values[ field ])
      errors[ field ] = 'Required';
  });

  // URL
  const isURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(values.website);
  if (values.website && values.website.length > 0 && !isURL)
    errors.website = 'Invalid URL.';

  return errors;
};

const AdminUniversityForm = ({ university, countries, showSnackbar, refreshUniversities, submitCreateUniversity, submitUpdateUniversity, submitUpdateUniversityLogo, handleSubmit, submitting }) => (
  <form onSubmit={ handleSubmit(values => {
    const { universityName, countryCode, city, website, logoImage } = values;
    const fileExists = logoImage && logoImage[0];

    const afterSubmitUniversity = () => {
      if (university) {
        showSnackbar('Successfully updated.');
        refreshUniversities();
      } else {
        showSnackbar('Successfully added university.');
      }
    };

    // Prepare values
    const preparedValues = {
      name: universityName, countryCode, city, website
    };

    // Unset logoImageUrl if it existed before
    if (university && university.logoImageUrl && !fileExists) {
      preparedValues.logoImageUrl = '';
    } 

    // Set UniversityId for update
    if (university) {
      preparedValues.UniversityId = university.id;
    }

    // Choose method to create/update
    const submitUniversityMethod = university ? submitUpdateUniversity : submitCreateUniversity;

    // Create or update university info
    submitUniversityMethod(preparedValues, function(response) {
      if (fileExists && logoImage[0] instanceof File) {
        const universityId = university ? university.id : response.body.university.id;

        const formData = new FormData();
        formData.append('uniLogo', logoImage[0]);
        formData.append('UniversityId', universityId);

        submitUpdateUniversityLogo(formData, afterSubmitUniversity);
      } else {
        afterSubmitUniversity();
      }
    });

  }) }>

    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <div className="row">
          <div className="col-xs-12">
            <TextFormField name="universityName" floatingLabelText="Name" />
          </div>
          <div className="col-xs-6">
            <SelectFormField name="countryCode" floatingLabelText="Country">
              { countries.map((country, idx) => <MenuItem key={idx} value={ country.alpha2Code } primaryText={ country.name } />) }
            </SelectFormField>
          </div>
          <div className="col-xs-6">
            <TextFormField name="city" floatingLabelText="City" />
          </div>
          <div className="col-xs-12">
            <TextFormField name="website" floatingLabelText="Website URL" />
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 center-xs">
        <DropzoneFormField name="logoImage" />
      </div>
    </div>

    <div className="row center-xs">
      <div className="col-xs">
        <RaisedButton primary disabled={ submitting } type="submit" label="Update"  style={{ margin: 20 }} />
      </div>
    </div>

  </form>
);

AdminUniversityForm.propTypes = {
  university: universityPropType,
  countries: React.PropTypes.arrayOf(countryPropType).isRequired,
  submitCreateUniversity: React.PropTypes.func,
  submitUpdateUniversity: React.PropTypes.func,
  showSnackbar: React.PropTypes.func.isRequired,
  refreshUniversities: React.PropTypes.func,
  ...reduxFormPropTypes,
};

export default reduxForm({ validate })(AdminUniversityForm);