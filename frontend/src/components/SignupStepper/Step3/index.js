// import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './Step3';

// react-komposer
// const composer = (props, onData) => {
//   const user = Meteor.user();

//   if (user.homeUniId) {
//     Meteor.call('University.get', user.homeUniId, (err, uni) => {
//       const emailDomains = JSON.parse(uni.emailDomains);

//       onData(null, {
//         user, university: uni, emailDomains
//       });
//     });
//   }

// };

// const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

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

const Step3 = connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);

export default Step3;
