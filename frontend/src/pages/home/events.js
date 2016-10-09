import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';

import EventList from '../../components/HomeComponent/Events/EventList';


var date=new Date();
var fbseed = 
[
  {
    id: 1234123,
    url: 'http://Facebook.com',
    yes_rsvp_count: 4,
    name: 'cat event',
    coverPicture: '',
    startTime: date,
    stats:{
    	attending: 5
    },
    venue:{
    	profilePicture: ''
    }
  },
  {
    id: 1234123,
    url: 'http://Facebook.com',
    yes_rsvp_count: 4,
    name: 'cat event',
    coverPicture: '',
    startTime: date,
    stats:{
    	attending: 6
    },
    venue:{
    	profilePicture: ''
    }
  }
]

var meetupseed = 
[
  {
    id: 1234123,
    url: 'http://meetup.com',
    yes_rsvp_count: 4,
    name: 'cat event',
    coverPicture: '',
    startTime: date,
    stats:{
    	attending: 5
    },
    venue:{
    	profilePicture: ''
    }
  },
  {
    id: 1234123,
    url: 'http://meetup.com',
    yes_rsvp_count: 4,
    name: 'cat event',
    coverPicture: '',
    startTime: date,
    stats:{
    	attending: 6
    },
    venue:{
    	profilePicture: ''
    }
  }
]


class Events extends React.Component{
	componentWillMount(){
		//fetchHomeEvenets(groupId)
	}

	render(){
		return(
			<Grid>
			<Row>
			<Col xs={12} md={6}>
			<h3 className="event-title pinline"> <span>Facebook Events</span> </h3>
			{<EventList source="Facebook" groupId={ this.props.params.id } groupEvents={fbseed} />}
			</Col>
			<Col xs={12} md={6}>
			<h3 className="event-title pinline"> <span>Meetup Events</span> </h3>
			{<EventList source="Meetup" groupId={ this.props.params.id } groupEvents={meetupseed}/>}
			</Col>
			</Row>
			</Grid>
			);
	}
}
/*<EventList event={seed}*/

const mapStateToProps = (state )=>{
	return{
		params: state.home.homeCountry
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);