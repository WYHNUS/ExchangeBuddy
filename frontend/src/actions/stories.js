import request from 'superagent';

export const SAVE_STORY_CONTENT = 'SAVE_STORY_CONTENT';

export const CLICKED_UPLOAD = 'CLICKED_UPLOAD';
export const UPLOAD_CONTENT_SUCCESS = 'UPLOAD_CONTENT_SUCCESS';
export const UPLOAD_CONTENT_FAIL = 'UPLOAD_CONTENT_FAIL';

export const CLICKED_FETCH = 'CLICKED_FETCH';
export const FETCH_STORIES_SUCCESS = 'FETCH_STORIES_SUCCESS';
export const FETCH_STORIES_FAIL = 'FETCH_STORIES_FAIL';


import {ROOT_URL} from '../util/backend';


/*	Get a list of stories 	*/
export function clickedFetch() {
    return { type: CLICKED_FETCH };
}

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
			.end(function(err, res){
				console.log(err);
				console.log(res);
				if (err) {
					dispatch(fetchAllStoriesFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(fetchAllStoriesSuccess(res.data));
					} else {
						dispatch(fetchAllStoriesFail(res.body.message));
					}
				}
			});
  	}
}


/*	Edit and upload one story 	*/
export function saveStoryContent(title, content) {
	return { type: SAVE_STORY_CONTENT, title, content }
}

export function clickedUpload() {
    return { type: CLICKED_UPLOAD };
}

export function uploadContentSuccess(stories) {
    return { type: UPLOAD_CONTENT_SUCCESS, stories };
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
			.end(function(err, res){
				console.log(err);
				console.log(res);
				if (err) {
					dispatch(uploadContentFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(uploadContentSuccess(res.data));
					} else {
						dispatch(uploadContentFail(res.body.message));
					}
				}
			});
  	}
}