import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Icon from 'components/Icon';

import AdminUniversitiesList from './AdminUniversitiesList';

import { countryPropType } from 'util/propTypes';

export default class AdminUniversities extends React.Component {
  static propTypes = {
    countries: React.PropTypes.arrayOf(countryPropType).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCountryCode: 'SG',
      isAdding: false,
    };
  }

  render() {
    const { selectedCountryCode } = this.state;
    const { countries } = this.props;

    return (
      <div className="admin-universities">
        <div className="row middle-xs">
          <div className="col-xs-6 col-sm-3">
            <Subheader>Filter by country:</Subheader>
          </div>
          <div className="col-xs">
            <SelectField 
              onChange={ (event, value) => this.setState({ selectedCountryCode: countries[value].alpha2Code }) } 
              style={{ width: '100%' }} 
              value={ selectedCountryCode }>
              { countries.map((country, idx) => 
                <MenuItem key={ idx } value={ country.alpha2Code } primaryText={ country.name } />
              ) }
            </SelectField>
          </div>
        </div>
        
        { selectedCountryCode && <AdminUniversitiesList countries={ countries } countryCode={ selectedCountryCode } /> }

        <div className="row middle-xs center-xs">
          <div className="col-xs">
            <RaisedButton secondary label="Add University" icon={ <Icon name="add" /> } onClick={ () => this.setState({ isAdding: true }) } />
          </div>
        </div>
      </div>
    );
  }
}