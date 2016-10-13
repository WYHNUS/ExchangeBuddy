var moment=require('moment');

import React, {PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import Linkify from 'react-linkify';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
import $ from 'jquery';

class Story extends React.Component{
	//`/home/${state.home.homeGroupDetails.homeGroupDetails.id}`
	//'#content'
	//$(`#content_${this.props.story.id}`).append(this.props.story.content);

	componentDidMount(){
	}

	render(){
		const { content, author, createdAt, id, title, } = this.props.story;
		return (
			<div>
			<div className="story-row">
			<div className="story-avatar">{ UserHelper.getAvatar(author, 40) }</div>
			<div>{ title }</div>
			</div>
			</div>
			)
	}
	
	
}


export default class StoryList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() 
	{//chatScrollToLatest();
	}

	componentDidUpdate() 
{//chatScrollToLatest();
}

render() {
	const { stories, user } = this.props;

	return (
		<div>
		<div className="stories-container">
		{ stories.length > 0 && stories.map((story, idx) => <Story story={story}  key={ idx } />) }
		</div>
		</div>
		)
}
}


StoryList.propTypes = {
	stories: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};
