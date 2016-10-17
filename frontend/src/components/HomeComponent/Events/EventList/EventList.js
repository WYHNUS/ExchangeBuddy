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
    this.props.fetchEvents(1);
  }

	render() {
    const { source, groupId } = this.props;
    const { groupEvents, loading, error } = this.props.groupEvents;

    const EventItem = ({ source, groupEvent }) => {
      if (source == 'Facebook'){
        return <EventItemFb groupEvent={ groupEvent } groupId={ groupId } />;
      }
      else if (source == 'Meetup')
        return <EventItemMu groupEvent={ groupEvent } groupId={ groupId } />;
      else if (source == 'Created' )
        return <EventItemCreated groupEvent={groupEvent} groupId={groupId}/>
      else
        return null;
    };

    const showAllEvents = () => this.setState({ showAll: true });

    // Before button is clicked, only show 5 events
    // should optimize this to actually pull more events when u click show more
    const end = this.state.showAll ? groupEvents.length : 5;

    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

		return (
			<div className="event-list">
        { groupEvents.slice(0, end).map((groupEvent, idx) => 
          <EventItem key={ idx } source={ source } groupEvent={ groupEvent }/> ) }

        <div className='row center-xs'>
          <div className='col-xs event-item-button'>
            { this.state.showAll ? null
              : <RaisedButton style={{display:"block"}} label="Show all events" primary={true} onTouchTap={ showAllEvents } /> }
          </div>
        </div>
			</div>
		);
	}
}

EventsList.propTypes = {
  groupEvents: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  fetchEvents: PropTypes.func.isRequired
};
