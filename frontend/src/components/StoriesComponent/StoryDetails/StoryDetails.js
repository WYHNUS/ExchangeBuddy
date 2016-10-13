var moment=require('moment');

import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import Linkify from 'react-linkify';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
import $ from 'jquery';

class Story extends React.Component{

	componentDidMount(){
		$('#content').append(this.props.story.content);
	}

	render(){
		const { content, author, createdAt, id, title, } = this.props.story;
		return (
		<div>
		<div className="story-row">
		<div className="story-avatar">{ UserHelper.getAvatar(author, 40) }</div>
		<div>{ title }</div>
		<div id="content">{}</div>
		</div>
		</div>
		)
	}
	
	
}


export default class StoryDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
    //chatScrollToLatest();
}

componentDidUpdate() {
    //chatScrollToLatest();
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


StoryDetails.propTypes = {
	stories: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};
