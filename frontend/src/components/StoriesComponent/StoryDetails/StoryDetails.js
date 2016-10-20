var moment=require('moment');

import React, {PropTypes} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import ReactHtmlParser from 'react-html-parser';
// import truncate from 'truncate';
// import Linkify from 'react-linkify';
import { browserHistory } from 'react-router';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
// import $ from 'jquery';


export default class StoryDetails extends React.Component {
	componentDidMount() {
		this.props.fetchStory(this.props.id, this.props.user.id);
	}

	render() {
		const { user, fetching_result } = this.props;
		const { 
			id, title, content, User, 
			/*tags, favorites, status, storyImgUrl,*/ 
			createdAt, updatedAt 
		} = this.props.storyDetails;

		if (fetching_result) {
			$('#content').append(content);
		}

		return (
			<div className="text-content-wrapper">
				<div className="user-profile-container">
					<div xs={8} className="story-avatar">{ UserHelper.getAvatar(User, 40) }</div>
					<div className="author-details">
						<div>{ User.name }</div>
						<div><span>{moment(createdAt).fromNow()}</span></div>
					</div>
				</div>
				<div className="story-container">
					<div className="story-row">
						<h1 className="title">{ title }</h1>
						<div id="content">{}</div>
					</div>
				</div>
			</div>
		)
	}
}


StoryDetails.propTypes = {
	storyDetails: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};
