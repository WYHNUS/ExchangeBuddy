import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';

import EventList from '../../components/HomeComponent/Events/EventList';


var seed = 
{

}


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
			{/*<EventList source="Facebook" groupId={ this.props.params.id } />*/}
			</Col>
			<Col xs={12} md={6}>
			<h3 className="event-title pinline"> <span>Meetup Events</span> </h3>
			{/*<EventList source="Meetup" groupId={ this.props.params.id } />*/}
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