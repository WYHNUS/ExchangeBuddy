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
      terms: [ 'Fall', 'Spring' ]//,
      // fetching: false,
      // error: null
    };
  }

  componentDidMount() {
    // look for valid semesters
    if (this.props.uniName && !!this.props.universities) {
      var allUniList = this.props.universities;
      for (var i=0; i<allUniList.length; i++) {
        if (allUniList[i].name === this.props.uniName) {
          this.setState({
            terms : JSON.parse(allUniList[i].terms)
          });
          if (this.state.terms.length === 0) {
            this.setState({
              terms : [ 'Fall', 'Spring' ]
            });
          }
        }
      }
    }
  //     this.setState({fetching: true});

  //     var self = this;
  //     // set a dummy url and data here -> later need to replace with the correct one
  //     Axios.get("http://localhost:3001/university").then(function(res) {
  //         if (!self.unmounted)
  //           self.setState({terms: [ 'Fall', 'Spring' ], fetching: false});
  //     }).catch(function(res) {
  //         if (!self.unmounted) 
  //           self.setState({error: res.data, fetching: false});
  //     });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { uniName, universities/*, error, loading*/ } = this.props;

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