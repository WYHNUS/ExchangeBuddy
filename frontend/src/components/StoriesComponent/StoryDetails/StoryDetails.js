import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import moment from 'moment';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';

//import coverPhoto from '../../../res/story/storyimg.png';


export default class StoryDetails extends React.Component {
	componentWillMount() {
		this.props.fetchStory(this.props.id, this.props.user.id);
	}

	componentDidMount(){
		
	}

	componentDidUpdate(){
		$('#content').append(this.props.storyDetails.content);
	}

	render() {
		const { user/*, fetching_result*/ } = this.props;
		const { 
			id, title, content, User, 
			/*tags, favorites, status,*/ coverPhoto, 
			createdAt, updatedAt 
		} = this.props.storyDetails;

		/*if (fetching_result) {
			$('#content').append(content);
		}*/
		

		return (
			<div className="text-content-wrapper">
				<div className="row center-xs">
				<div className="col-xs-12 col-md-6 col-lg-4">
				<div className="user-profile-container">
					<div className="story-avatar">{ UserHelper.getAvatar(User, 60) }</div>
					<div className="author-details">
						<div>{ User.name }</div>
						{
							createdAt ?
								<div><span>{moment(createdAt).fromNow()}</span></div>
							: null
						}
					</div>
				</div>
				</div>
				</div>
				
				<div className="story-container">
					<div className="story-row">
						{	
							coverPhoto ?
								<img className="img" src={coverPhoto}/>
							: null
						}
						<h1 className="title">{ title }</h1>
						<div id="content" className="story-content"></div>
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
