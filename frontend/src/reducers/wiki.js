import {
	FETCH_SINGLE_STORY_SUCCESS
} from '../actions/stories';

const initialState=
{
	error: null,
	fetching: false,
	fetching_result: false,
	uploading: false,
	published: false,
	storyDetails: {},
	storyList: [],
	editingStory: {
		storyId: null,
		title: null,
		content: "<p>Share your life events here! :D </p>"
	}
}

export function wiki(state=initialState, action) 
{
	switch (action.type) 
	{
		case FETCH_SINGLE_STORY_SUCCESS:
			return Object.assign({}, state, {

		    });

		default:
			return state
	}
}