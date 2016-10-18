import request from 'superagent';

export const SAVE_JOURNAL_CONTENT = 'SAVE_JOURNAL_CONTENT';

export const CLICKED_UPLOAD = 'CLICKED_UPLOAD';
export const UPLOAD_CONTENT_SUCCESS = 'UPLOAD_CONTENT_SUCCESS';
export const UPLOAD_CONTENT_FAIL = 'UPLOAD_CONTENT_FAIL';

import {ROOT_URL} from '../util/backend';

export function saveJournalContent(content) {
	return { type: SAVE_JOURNAL_CONTENT, content }
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

export function uploadContentToServer(content, id) {
	return (dispatch) => {
	    dispatch(clickedUpload());

	    request.post(ROOT_URL + '/uploadJournal')
			.send({
				userId: id,
				journalContent: content
			})
			.end(function(err, res){
				console.log(res);
				if(res.body.status === "success"){
					dispatch(uploadContentSuccess(res.body.message));
				} else {
					dispatch(uploadContentFail(res.body.message));
				}
			});
  	}
}