import React, { Component, PropTypes } from 'react';
//import { withGoogleMap } from "react-google-maps";
import {browserHistory} from 'react-router';
import * as geo from '../util/geolocator';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as IconsHelper from '../util/icons';

export default class MapComponent extends Component{
	constructor(props) {
		super(props);
		this.state = {
			zoom: 17,
			center: props.location
		}
		this.map = null;
		this.geoId = null;
		this.updateLocation = this.updateLocation.bind(this);
	}

	updateLocation(coords) {
		this.props.setLocation([coords.longitude, coords.latitude])
	}

	render() {



		return (
			<Map google={window.google} zoom={13}>
{/*
			<Marker onClick={this.onMarkerClick}
			name={'Current location'} />

			<InfoWindow onClose={this.onInfoWindowClose}>
			<div>
			<h1>{this.state.selectedPlace.name}</h1>
			</div>
			</InfoWindow>*/}
			</Map>
			);
	}


}

/*MapComponent.propTypes = {
	user: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
};*/