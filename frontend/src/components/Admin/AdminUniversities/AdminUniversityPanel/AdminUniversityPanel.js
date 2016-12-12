import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
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

const AdminUniversityPanel = ({ 
  university: { name, city, logoImageUrl, id: universityId }, countries, 
  showSnackbar, refreshUniversities, submitUpdateUniversity, submitUpdateUniversityLogo, handleSubmit, submitting,
}) => (
  <Card className="admin-university-panel" style={{ textAlign: 'left' }}>
    <CardHeader title={ name } subtitle={ city } avatar={ logoImageUrl && <Avatar src={ logoImageUrl } /> } actAsExpander showExpandableButton />
    <CardText expandable>
      <form onSubmit={ handleSubmit(values => {
          const { universityName, countryCode, city, website, logoImage } = values;

          const processFields = (submitValues) => {
            submitUpdateUniversity({
              ...submitValues,
              name: universityName, countryCode, city, website
            }, function afterSubmit() {
              showSnackbar('Successfully updated.');
              refreshUniversities();
            });
          };

          // Process file upload if present.
          if (logoImage && logoImage[0] && logoImage[0] instanceof File) {
            const formData = new FormData();
            formData.append('uniLogo', logoImage[0]);
            formData.append('UniversityId', universityId);

            submitUpdateUniversityLogo(formData, processFields);
          } else if (logoImageUrl && (!logoImage || !logoImage[0] || !(logoImage[0] instanceof File))) {
            processFields({ logoImageUrl: '' });
          } else {
            processFields();
          }

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
    </CardText>
  </Card>
);

AdminUniversityPanel.propTypes = {
  university: universityPropType.isRequired,
  countries: React.PropTypes.arrayOf(countryPropType).isRequired,
  submitUpdateUniversity: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refreshUniversities: React.PropTypes.func.isRequired,
  ...reduxFormPropTypes,
};

export default reduxForm({
  validate,
})(AdminUniversityPanel);
