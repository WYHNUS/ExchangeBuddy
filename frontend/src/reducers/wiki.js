import {
	FECTCH_WIKI_PAGE, FECTCH_WIKI_PAGE_SUCCESS, FECTCH_WIKI_PAGE_FAIL,
	INITIALIZE_WIKI_FORM
} from '../actions/wiki';

const initialState=
{
	error: null,
	fetching: false,
	uploading: false,
	published: false,
	wiki: {
		id: null,
		title: null,
		view: null
	},
	sections: [{
		User: {
			id: null, name: null, profilePictureUrl: null
		},
		WikiSection: {
			id: null, name: null, sectionIndex: null, sectionType: "OpenToEdit", 
			totalVersionCount: null, displayedVersionCount: null
		}
	}],
	editingSection: {
		title: null,
		content: null
	}
}

export function wiki(state=initialState, action) 
{
	switch (action.type) 
	{
		case FECTCH_WIKI_PAGE:
			return Object.assign({}, state, {
				fetching: true,
				error: null
		    });

		// fetch single page status
		case FECTCH_WIKI_PAGE_SUCCESS:
			return Object.assign({}, state, {
				wiki: action.wiki,
				sections: action.sections,
				fetching: false,
				error: null
		    });
		case FECTCH_WIKI_PAGE_FAIL:
			return Object.assign({}, state, {
				fetching: false,
				error: action.error
		    });

		// edit wiki section
		case INITIALIZE_WIKI_FORM:
			return Object.assign({}, state, {
				editingSection: {
					title: action.title,
					content: action.content
				}
			});

		default:
			return state
	}
}