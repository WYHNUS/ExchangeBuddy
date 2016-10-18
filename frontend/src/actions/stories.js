// import request from 'superagent';

export const SAVE_JOURNAL_CONTENT = 'SAVE_JOURNAL_CONTENT';

import {ROOT_URL} from '../util/backend';

export function saveJournalContent(content) {
	return { type: SAVE_JOURNAL_CONTENT, content }
}