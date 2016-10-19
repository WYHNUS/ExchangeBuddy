var moment=require('moment');

import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import {Link, browserHistory} from 'react-router';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
import * as IconsHelper from '../../../util/icons';
import $ from 'jquery';
var moment = require('moment');

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles={
	stories_list_grid: {
		width: 500,
		overflowY: 'auto'
	},
	stories_list_root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	}
}

class Story extends React.Component{
	componentDidMount(){
		// fetchAllStories();
	}

	render(){
		const { id, title, tags, favorites, status, author, storyImgUrl, createdAt } = this.props.story;
		return (
			<GridTile
			key={storyImgUrl}
			title={title}
			actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
			subtitle={
				<span>
				<div><span>{IconsHelper.smallWhiteMaterialIcon("perm_identity")} by <b>{author.displayName}</b></span></div>
				<div><span>{moment(createdAt).fromNow()}</span></div>
				</span>
			}
			titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
			<img src={storyImgUrl} />
			</GridTile>
		)
	}
}


export default class StoryList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		const { stories, user } = this.props;

		return (
			<div>
				<div style={styles.stories_list_root}>
				<GridList
					className="stories-container"
					cols={1}
					cellHeight={400}
					padding={1}
					style={styles.stories_list_grid}
				>
					{ stories.length > 0 && stories.map((story, idx) =>
						( <Story story={story} key={ idx }/> ) 
					)}
				</GridList>
				
				</div>
			</div>
			)
	}
}


StoryList.propTypes = {
	stories: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};
