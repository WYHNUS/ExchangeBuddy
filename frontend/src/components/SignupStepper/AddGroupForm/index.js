import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './AddGroupForm';

// react-komposer
const composer = (props, onData) => {
  Meteor.call('University.getAll', (err, universities) => {
    onData(null, { universities });
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapStateToProps = (state) => {
  return {
    formState: state.form
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
