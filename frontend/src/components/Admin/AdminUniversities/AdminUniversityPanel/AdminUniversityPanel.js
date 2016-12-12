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

  return errors;
};

const AdminUniversityPanel = ({ university: { name, city, logoImageUrl }, countries }) => (
  <Card className="admin-university-panel" style={{ textAlign: 'left' }}>
    <CardHeader title={ name } subtitle={ city } avatar={ logoImageUrl && <Avatar src={ logoImageUrl } /> } actAsExpander showExpandableButton />
    <CardText expandable>
      <form>
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
            <DropzoneFormField name="logoImageUrl" />
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs">
            <RaisedButton primary type="submit" label="Update"  style={{ margin: 20 }} />
          </div>
        </div>
      </form>
    </CardText>
  </Card>
);

AdminUniversityPanel.propTypes = {
  university: universityPropType.isRequired,
  countries: React.PropTypes.arrayOf(countryPropType).isRequired,
};

export default reduxForm({
  validate,
})(AdminUniversityPanel);
