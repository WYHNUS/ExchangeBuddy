// var moment=require('moment');

import React, {PropTypes} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import ReactHtmlParser from 'react-html-parser';
// import truncate from 'truncate';
// import Linkify from 'react-linkify';
import { browserHistory } from 'react-router';

// import { formatTime } from '../../../util/helper';
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
			<div>
				<div className="stories-container">
					<div className="story-row">
						<div className="story-avatar">{ UserHelper.getAvatar(User, 40) }</div>
						<div>{ title }</div>
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
