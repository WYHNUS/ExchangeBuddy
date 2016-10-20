import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import RaisedButton from 'material-ui/RaisedButton';

import EventItemMu from './EventItemMu';
import EventItemFb from './EventItemFb';
import EventItemCreated from './EventItemCreated';

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    };
  }

  componentWillMount(){
    //this.props.fetchEvents(this.props.groupId);
  }

	render() {
    const { source, showSnackbar, user,
      goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
      fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure, universities } = this.props;
    const { homeEvents, loading, error } = this.props.homeEvents;

    /*const EventItem = ({ key, source, groupEvent }) => {
      if (source == 'Facebook'){
        return <EventItemFb groupEvent={ groupEvent } groupId={ groupId } />;
      }
      else if (source == 'Meetup')
        return <EventItemMu groupEvent={ groupEvent } groupId={ groupId } />;
      else if (source == 'Created' )
        return <EventItemCreated key={key} groupEvent={groupEvent} groupId={groupId} 
      showSnackbar={showSnackbar} user={user} 
      goForAnEventSuccessUpdate={goForAnEventSuccessUpdate}/>
      else
        return null;
    };*/

    const showAllEvents = () => this.setState({ showAll: true });
    //const showAllEvents = () => console.log(homeEvents);

    // Before button is clicked, only show 5 events
    // should optimize this to actually pull more events when u click show more
    const end = this.state.showAll ? homeEvents.length : 5;

    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

		return (
			<div className="event-list">
        { homeEvents.slice(0, end).map((groupEvent, idx) => 
            <EventItemCreated key={idx} groupEvent={groupEvent} 
              homeGroupDetails={this.props.homeGroupDetails} 
              showSnackbar={showSnackbar} user={user} 
              goForAnEventSuccessUpdate={goForAnEventSuccessUpdate}
              ungoForAnEventSuccessUpdate={ungoForAnEventSuccessUpdate}
              fetchEvents={this.props.fetchEvents}
              fetchAllUniversitiesSuccess={fetchAllUniversitiesSuccess}
              fetchAllUniversitiesFailure={fetchAllUniversitiesFailure}
              universities={universities}/>
          /*<EventItem key={ idx } source={ source } groupEvent={ groupEvent }/>*/ ) }

        <div className='row center-xs'>
          <div className='col-xs event-item-button'>
            { this.state.showAll ? null
              : <RaisedButton 
              className="event-item-button-add" 
              style={{display:"block"}} 
              label="Show all events" 
              primary={true} 
              onTouchTap={ showAllEvents } /> }
          </div>
        </div>
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
  universities:PropTypes.array.isRequired
  //fetchEvents: PropTypes.func.isRequired
};
