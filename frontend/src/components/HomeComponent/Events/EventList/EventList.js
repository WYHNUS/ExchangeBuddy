import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loading from '../../../Loading';
import RaisedButton from 'material-ui/RaisedButton';

import EventItemMu from './EventItemMu';
import EventItemFb from './EventItemFb';

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false
    };
  }

	render() {
    const { groupEvents, source, groupId } = this.props;

    const EventItem = ({ source, groupEvent }) => {
      if (source == 'Facebook'){
        return <EventItemFb groupEvent={ groupEvent } groupId={ groupId } />;
      }
      else if (source == 'Meetup')
        return <EventItemMu groupEvent={ groupEvent } groupId={ groupId } />;
      else
        return null;
    };

    const showAllEvents = () => this.setState({ showAll: true });

    // Before button is clicked, only show 5 events
    const end = this.state.showAll ? groupEvents.length : 5;

		return (
      /*<div className="row feature-row center-xs">
              <div className="col-xs">{IconsHelper.materialIcon("info")}<p>Information Wiki</p></div>
              <div className="col-xs">{IconsHelper.materialIcon("group")}<p>Group Chat</p></div>
              <div className="col-xs">{IconsHelper.materialIcon("event")}<p>Event Listing</p></div>
          </div>*/
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
  groupId: PropTypes.string.isRequired
};
