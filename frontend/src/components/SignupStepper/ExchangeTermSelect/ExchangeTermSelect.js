// import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithPromise } from 'react-komposer';
import Loading from '../../Loading';
import Axios from 'axios';

import { SelectFormField } from '../../Field';
import MenuItem from 'material-ui/MenuItem';

export default class ExchangeTermSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [ 'Fall', 'Spring' ]
    };
  }

  /* >>>>>>>>>>>>>  Comment out temporarily as no term variable in the DB anyway...  <<<<<<<<<<<<< */
  // componentDidMount() {
  //   // look for valid semesters
  //   if (this.props.exchangeUniName && this.props.universities) {
  //     for (var i=0; i<allUniList.length; i++) {
  //       if (allUniList[i].name === this.props.exchangeUniName) {
  //         this.state.terms = JSON.parse(allUniList[i].terms);
  //         if (this.state.terms.length === 0) {
  //           this.state.terms = [ 'Fall', 'Spring' ];
  //         }
  //       }
  //     }
  //   }
  // }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { /*uniName,*/ universities } = this.props;

    if (this.state.terms) {
      return (
        <SelectFormField
          name="exchangeTerm"
          floatingLabelText="Start semester of exchange">
          { this.state.terms.map(term => <MenuItem key={term} value={term} primaryText={term} />) }
        </SelectFormField>
      );
    } else {
      return null;
    }
  }
}