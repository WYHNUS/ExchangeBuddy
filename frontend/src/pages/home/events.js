import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import * as IconsHelper from '../../util/icons' 

import EventList from '../../components/HomeComponent/Events/EventList';

import {fetchFbEvents, fetchFbEventsSuccess, 
    fetchFbEventsFailure, fetchMuEvents} from '../../actions/home';


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

const university = 
{
        lat:1.2966426,
        lng:103.7742052,
        city: 'Singapore',
        country: 'Singapore',
        countryCode: 'SGP'
};

const country = 
{
    capital: "Singapore"
}


class Events extends React.Component{
	componentWillMount(){
		//fetchHomeEvenets(groupId)
        fetchFbEvents(123,[1231,12341]);
        fetchMuEvents(university, country);
	}

	render(){
        const {id} = this.props.homeGroupDetails;
		return(
			<Grid>
            <div className='row center-xs'>
            <div className="col-xs-12">
            <RaisedButton
              label='New Event'
              onTouchTap={ () => browserHistory.push(`/home/${id}/events/new`)}
              secondary={true}
              icon={IconsHelper.materialIcon("add")}/>
            </div>
            </div>
			<Row>
			<Col xs={12} md={6}>
			<h3 className="event-title pinline"> <span>Facebook Events</span> </h3>
			{<EventList source="Facebook" groupId={ id } groupEvents={fbseed} />}
			</Col>
			<Col xs={12} md={6}>
			<h3 className="event-title pinline"> <span>Meetup Events</span> </h3>
			{<EventList source="Meetup" groupId={ id } groupEvents={meetupseed}/>}
			</Col>
			</Row>
			</Grid>
			);
	}
}
/*<EventList event={seed}*/

const mapStateToProps = (state )=>{
	return{
		homeGroupDetails: state.home.homeGroupDetails.homeGroupDetails
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch),

        fetchFbEvents:(countryCode, uniLatLng)=>{
          dispatch(fetchFbEvents(countryCode, uniLatLng)).then((response) => {
            !response.error ? dispatch(fetchFbEventsSuccess(response.payload)) : 
            dispatch(fetchFbEventsFailure(response.payload));
        })},

        fetchMuEvents:(university, country)=>{
            dispatch(fetchMuEvents(university,country))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Events);