import {
	SAVE_STORY_CONTENT, 
	CLICKED_UPLOAD, UPLOAD_CONTENT_SUCCESS, UPLOAD_CONTENT_FAIL,
	CLICKED_FETCH, FETCH_STORIES_SUCCESS, FETCH_STORIES_FAIL,
	FETCH_SINGLE_STORY_SUCCESS, FETCH_SINGLE_STORY_FAIL
} from '../actions/stories';

const initialState=
{
	error: null,
	fetching: false,
	fetching_result: false,
	storyDetails: {},
	storyList: [],
	editingStory: {
		title: null,
		content: "<p>Share your life events here! :D </p>",
		error: null, 
		uploading: false,
		published: false
	}
}

export function stories(state=initialState, action) 
{
	switch (action.type) 
	{
		case FETCH_SINGLE_STORY_SUCCESS:
			return Object.assign({}, state, {
				storyDetails: action.story,
				error: null,
				fetching: false,
				fetching_result: true
		    });


		case CLICKED_FETCH: 
			return Object.assign({}, state, {
				fetching_result: false,
				fetching: true
		    });

		case FETCH_STORIES_SUCCESS:
			return Object.assign({}, state, {
		        storyList: action.stories,
				error: null,
				fetching: false
		    });

		case FETCH_SINGLE_STORY_FAIL:
		case FETCH_STORIES_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				fetching: false
		    });


		case SAVE_STORY_CONTENT:
			return Object.assign({}, state, {
		        editingStory: {
					title: state.editingStory.title,
					content: action.content,
					error: null, 
					uploading: false,
					published: false
		        }
		    });

		case CLICKED_UPLOAD:
			return Object.assign({}, state, {
		        editingStory: {
					title: state.editingStory.title,
					content: state.editingStory.content,
					error: null, 
					uploading: true,
					published: false
		        }
			});

		case UPLOAD_CONTENT_SUCCESS:
			return Object.assign({}, state, {
				editingStory: {
					title: null,
					content: "<p>Share your life events here! :D </p>",
					error: null, 
					uploading: false,
					published: true
		        }
			});

		case UPLOAD_CONTENT_FAIL:
			return Object.assign({}, state, {
				editingStory: {
					title: state.editingStory.title,
					content: state.editingStory.content,
					error: action.error, 
					uploading: false,
					published: false
		        }
			});

		default:
			return state
	}
}