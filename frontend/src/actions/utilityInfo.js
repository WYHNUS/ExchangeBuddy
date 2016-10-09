//api for fetching messages
export const FETCH_ALL_UNIVERSITY = 'FETCH_ALL_UNIVERSITY';

const ROOT_URL = 'localhost:3001';

export function fetchAllUniversity(groupId) {
	const request = axios({
		method: 'get',
		url: `${ROOT_URL}/university`,
		headers: []
	});

	return {
		type: FETCH_ALL_UNIVERSITY,
		payload: request
	};
}