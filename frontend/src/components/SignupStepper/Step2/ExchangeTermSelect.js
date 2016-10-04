import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

import { SelectFormField } from '../../Field';
import MenuItem from 'material-ui/MenuItem';

const ChildComponent = ({ terms }) => {
  if (terms)
    return (
      <SelectFormField
        name="exchangeTerm"
        floatingLabelText="Start semester of exchange">
        { terms.map(term => <MenuItem key={term} value={term} primaryText={term} />) }
      </SelectFormField>
    );
  else
    return null;
};

const composer = (props, onData) => {
  const user = Meteor.user();
  const defaultTerms = [ 'Fall', 'Spring' ];

  if (!props.uniName)
    onData(null, {});
  else
    Meteor.call('University.getByName', props.uniName, (err, uni) => {
      if (!uni)
        return;

      let terms = uni.terms && uni.terms.length && JSON.parse(uni.terms);
      if (!terms)
        terms = defaultTerms;

      onData(null, {
        terms
      });

    });

};

export default composeWithTracker(composer, <div />)(ChildComponent);
