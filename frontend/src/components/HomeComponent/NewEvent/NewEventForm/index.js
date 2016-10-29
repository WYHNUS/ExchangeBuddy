import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import Loading from '../../../Loading';

// Component
import ChildComponent from './NewEventForm';

import {postEvents, fetchEvents, fetchEventsSuccess, fetchEventsFailure} from '../../../../actions/home'
import {showSnackbar} from '../../../../actions/messageSnackbar';

// Redux
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    postEvents: (lat, lng, location, title, startTime, endTime, detail, imgSrc, GroupId, UserId) => {
      dispatch(postEvents(lat, lng, location, title, startTime, endTime, detail, imgSrc, GroupId, UserId))
        .payload.then((response) => {
          console.log(response);
          if (!response.error) {
            dispatch(showSnackbar('Posted an event!'));
            dispatch(fetchEvents(GroupId)).payload.then((response) => {
              if (!response.error) {
                dispatch(fetchEventsSuccess(response.body));
              } else {
                dispatch(fetchEventsFailure(response.error));
              }
            }, (err) => {
              if (err.status === 401) {
                cookie.remove('authToken');
                this.props.clearUser();
                // need to redirect to a new version of login page
                browserHistory.push('/');
              } else {
                dispatch(fetchEventsFailure(err.response.error.message));
              }
            });
          } else {
            console.log(response.error);
            dispatch(showSnackbar('Error in posting event'));
          }
        }, (err) => {
          if (err.status === 401) {
            cookie.remove('authToken');
            this.props.clearUser();
            // need to redirect to a new version of login page
            browserHistory.push('/');
          } else {
            dispatch(fetchEventsFailure(err.response.error.message));
          }
        });
    },
    showSnackbar: (message) => { dispatch(showSnackbar(message)) },
  };
};

const mapStateToProps = (state) => {
  return {
    homeGroupDetails: state.home.homeGroupDetails,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
