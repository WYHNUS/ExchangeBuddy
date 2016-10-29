import request from 'superagent';
import cookie from 'react-cookie';
import { bearer } from '../util/bearer';
import { ROOT_URL } from '../util/backend';
import { clearUser } from './authActions';

export const SAVE_STORY_CONTENT = 'SAVE_STORY_CONTENT';
export const RESET_EDITING_STORY = 'RESET_EDITING_STORY';

export const CLICKED_UPLOAD = 'CLICKED_UPLOAD';
export const UPLOAD_CONTENT_SUCCESS = 'UPLOAD_CONTENT_SUCCESS';
export const UPLOAD_CONTENT_FAIL = 'UPLOAD_CONTENT_FAIL';

export const CLICKED_FETCH = 'CLICKED_FETCH';
/*	Fetch list of all stories  */
export const FETCH_STORIES_SUCCESS = 'FETCH_STORIES_SUCCESS';
export const FETCH_STORIES_FAIL = 'FETCH_STORIES_FAIL';

/*	Fetch individual story  */
export const FETCH_SINGLE_STORY_SUCCESS = 'FETCH_SINGLE_STORY_SUCCESS';
export const FETCH_SINGLE_STORY_FAIL = 'FETCH_SINGLE_STORY_FAIL';


export function clickedFetch() {
    return { type: CLICKED_FETCH };
}

/*	Get one story 	*/
export function fetchStorySuccess(story) {
    return { type: FETCH_SINGLE_STORY_SUCCESS, story };
}

export function fetchStoryFail(error) {
    return { type: FETCH_SINGLE_STORY_FAIL, error };
}

export function fetchOneStory(storyId, userId) {
	return (dispatch) => {
	    dispatch(clickedFetch());

	    request.post(ROOT_URL + '/story/' + storyId)
	    	.send({ 
	    		userId: userId 
	    	})
	    	// allow all user to access stories
	    	// .use(bearer)
	    	.end(function(err, res){
				// console.log(err);
				// console.log(res);
				if (err) {
					dispatch(fetchStoryFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(fetchStorySuccess(res.body.message));
					} else {
						dispatch(fetchStoryFail(res.body.message));
					}
				}
			});
  	}
}

/*	Get a list of stories 	*/
export function fetchAllStoriesSuccess(stories) {
    return { type: FETCH_STORIES_SUCCESS, stories };
}

export function fetchAllStoriesFail(error) {
    return { type: FETCH_STORIES_FAIL, error };
}

export function fetchAllStories() {
	return (dispatch) => {
	    dispatch(clickedFetch());

	    request.get(ROOT_URL + '/allStories')
	    	// allow all user to access stories
	    	// .use(bearer)
			.end(function(err, res){
				// console.log(err);
				// console.log(res);
				if (err) {
					dispatch(fetchAllStoriesFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(fetchAllStoriesSuccess(res.body.message));
					} else {
						dispatch(fetchAllStoriesFail(res.body.message));
					}
				}
			});
  	}
}


/*	Edit and upload one story 	*/
export function saveStoryContent(content) {
	return { type: SAVE_STORY_CONTENT, content }
}

export function resetEditingStory() {
	return { type: RESET_EDITING_STORY }
}

export function clickedUpload() {
    return { type: CLICKED_UPLOAD };
}

export function uploadContentSuccess(story) {
    return { type: UPLOAD_CONTENT_SUCCESS, story };
}

export function uploadContentFail(error) {
    return { type: UPLOAD_CONTENT_FAIL, error };
}

export function uploadContentToServer(title, content, id) {
	return (dispatch) => {
	    dispatch(clickedUpload());

	    request.put(ROOT_URL + '/story')
			.send({
				userId: id,
				storyTitle: title,
				storyContent: content
			})
			.use(bearer)
			.end(function(err, res){
				// console.log(err);
				// console.log(res);
				if (res.status === 401) {
					// session expired -> require login
					cookie.remove('authToken');
					dispatch(clearUser());
				} else if (err) {
					dispatch(uploadContentFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(uploadContentSuccess(res.body.message));
					} else {
						dispatch(uploadContentFail(res.body.message));
					}
				}
			});
  	}
}