import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import Truncate from 'react-truncate';
import {Link, browserHistory} from 'react-router';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';
import * as IconsHelper from '../../../util/icons';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import $ from 'jquery';
var moment = require('moment');

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

// dummy one image ...
//let storyImgUrl = "http://i.imgur.com/RRUe0Mo.png";

class Story extends React.Component{
	componentDidMount(){
	}

	clickHandler(e) {
		browserHistory.push('/stories/' + this.props.story.id);
	}

	/*actionIcon={ 
					<IconButton><StarBorder color="white" /></IconButton> 
				}*/

	render(){
		const { id, title, /* favorites, status, ,*/tags, storyImgUrl,User, createdAt, key } = this.props.story;
		return (
			<GridTile
				className="single-story"
				key={key}
				title={title}
				onClick={this.clickHandler.bind(this)}
				subtitle={
					<div>
					<div className="col-xs-12 story-item-info">
						{IconsHelper.icon('person')}<span>&nbsp;
						{id===1?
						(<a href={"https://www.youtube.com/watch?v=eVhtup5r55I"}>
							<span style={{marginLeft:'3px',fontWeight:'bold',color:'white',textDecoration:'underline'}}>{`by ${User.name}`}</span>
						</a>
						):
						(`by ${User.name}`)
						} 
						</span>
					</div>
					<div className="col-xs-12 story-item-info">
						{IconsHelper.icon('watch_later')}<span>&nbsp; {moment(createdAt).fromNow()}</span>
					</div>
					<div className="col-xs-12 story-item-info">
						{IconsHelper.icon('local_offer')}<span>&nbsp; 
						<Truncate ellipsis={<span>...</span>}>{tags.map(function(tag){return(<span>{tag+" "}</span>)})}</Truncate></span>
					</div>
					</div>


					/*<span>
					<div><span>{IconsHelper.smallWhiteMaterialIcon("perm_identity")} by <b>{User.name}</b></span></div>
					<div><span>{moment(createdAt).fromNow()}</span></div>
					</span>*/
				}
				titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.6) 70%,rgba(0,0,0,0.4) 100%)">
				<img className='storyImage' src={storyImgUrl} />
			</GridTile>
		)
	}
}


export default class StoryList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//TODO: Uncomment this
		//this.props.fetchAllStories();
	}

	render() {
		const { stories, user } = this.props;
		
		return (
			<div>
				<div style={styles.stories_list_root}>
				{ stories.length > 0 ?
					<GridList
					className="stories-container"
						cols={1}
						cellHeight={300}
						padding={1}
						style={styles.stories_list_grid}
					>
						{ stories.length > 0 && stories.map((story, idx) =>
							( <Story story={story} key={ idx } /> ) 
						)}
					</GridList>
					: null
				}
				
				</div>
			</div>
			)
	}
}


StoryList.propTypes = {
	stories: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};
