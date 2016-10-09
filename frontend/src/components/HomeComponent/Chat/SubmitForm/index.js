import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './SubmitForm';

// react-komposer
/*const composer = (props, onData) => {
  const user = Meteor.user();

  onData(null, { user });
};*/

//const ComposedComponent = composeWithTracker(Loading)(ChildComponent);

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
  	user:state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
