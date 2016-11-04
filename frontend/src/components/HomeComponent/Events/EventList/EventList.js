import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from 'react-spinkit';

import EventItemMu from './EventItemMu';
import EventItemFb from './EventItemFb';
import EventItemCreated from './EventItemCreated';

export default class EventsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

	render() {
    const { source, showSnackbar, user,
      goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
      fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure, universities,
      deleteAnEventSuccessUpdate, clearUser } = this.props;
    const { homeEvents, loading, error } = this.props.homeEvents;

    if(loading) {
      return <Spinner spinnerName="circle" />   
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

		return (
			<div className="event-list">
        { 
          (homeEvents.length>0)?
          (homeEvents.map((groupEvent, idx) => 
            <EventItemCreated key={idx} groupEvent={groupEvent} 
              homeGroupDetails={this.props.homeGroupDetails} 
              showSnackbar={showSnackbar} 
              user={user} 
              goForAnEventSuccessUpdate={goForAnEventSuccessUpdate}
              ungoForAnEventSuccessUpdate={ungoForAnEventSuccessUpdate}
              fetchEvents={this.props.fetchEvents}
              fetchAllUniversitiesSuccess={fetchAllUniversitiesSuccess}
              fetchAllUniversitiesFailure={fetchAllUniversitiesFailure}
              universities={universities}
              deleteAnEventSuccessUpdate={deleteAnEventSuccessUpdate}
              clearUser={clearUser}
              />
              )
          ):
          (<h2>Add a new event and meet new people!</h2>)
        }

			</div>
		);
	}
}

EventsList.propTypes = {
  homeEvents: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
  homeGroupDetails: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  goForAnEventSuccessUpdate: PropTypes.func.isRequired,
  ungoForAnEventSuccessUpdate: PropTypes.func.isRequired,
  fetchEvents:PropTypes.func.isRequired,
  fetchAllUniversitiesSuccess:PropTypes.func.isRequired,
  fetchAllUniversitiesFailure:PropTypes.func.isRequired,
  universities:PropTypes.array.isRequired,
  resetEvents:PropTypes.func.isRequired,
  deleteAnEventSuccessUpdate: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired
};
