var moment=require('moment');

import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import Linkify from 'react-linkify';
import { browserHistory } from 'react-router';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
import $ from 'jquery';


export default class StoryDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() 
	{
		console.log(this.props.routeParams);	// not working don't know why...
		// this.props.fetchStory(this.props.routeParams.id, this.user.userObject.userId);
		// $('#content').append(this.props.storyDetails.content);
	}

	componentDidUpdate() 
	{//chatScrollToLatest();
	}

	render() {
		const { user, location } = this.props;
		const { id, title, tags, favorites, status, author, 
			storyImgUrl, createdAt } = this.props.storyDetails;

		return (
			<div>
			<div className="stories-container">
			<div>
			<div className="story-row">
			<div className="story-avatar">{ UserHelper.getAvatar(author, 40) }</div>
			<div>{ title }</div>
			<div>{ favorites }</div>
			<div id="content">{}</div>
			</div>
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
