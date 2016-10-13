var moment=require('moment');

import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import Linkify from 'react-linkify';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
import $ from 'jquery';

/*
	id:1,
	title: 'For NUS Students: Starting the Application Process',
	tags: ['application','Chem Eng','NUS','SEP'],
	favorites: 20,
	status: 'published',
	author:{
		diplayName: "Lee Min Han",
		userId:1
	},
	storyImgUrl: story1ImgUrl,
	createdAt: 'Thu Oct 13 2016 14:45:36 GMT+0800 (SGT)'
	*/

export default class StoryDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() 
	{//chatScrollToLatest();
		$('#content').append(this.props.storyDetails.content);
	}

	componentDidUpdate() 
	{//chatScrollToLatest();
	}

	render() {
		const { user } = this.props;
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
