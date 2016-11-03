var moment=require('moment');

import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';


export default class WikiDetail extends React.Component {
	componentWillMount() {
		//this.props.fetchStory(this.props.id, this.props.user.id);
	}

	componentDidMount(){
		// $('#content').append(this.props.storyDetails.content);
	}

	render() {
		
		return (
			<div className="text-content-wrapper">
			</div>
		)
	}
}


WikiDetail.propTypes = {
	// storyDetails: PropTypes.object.isRequired,
	// user: PropTypes.object.isRequired
};
