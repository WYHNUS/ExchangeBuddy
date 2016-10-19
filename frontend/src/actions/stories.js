import request from 'superagent';

export const SAVE_STORY_CONTENT = 'SAVE_STORY_CONTENT';

export const CLICKED_UPLOAD = 'CLICKED_UPLOAD';
export const UPLOAD_CONTENT_SUCCESS = 'UPLOAD_CONTENT_SUCCESS';
export const UPLOAD_CONTENT_FAIL = 'UPLOAD_CONTENT_FAIL';

import {ROOT_URL} from '../util/backend';

export function saveStoryContent(title, content) {
	return { type: SAVE_STORY_CONTENT, title, content }
}

export function clickedUpload() {
    return { type: CLICKED_UPLOAD };
}

export function uploadContentSuccess(msg) {
    return { type: UPLOAD_CONTENT_SUCCESS, msg };
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
						dispatch(uploadContentSuccess(res.body.message));
					} else {
						dispatch(uploadContentFail(res.body.message));
					}
				}
			});
  	}
}