import {
	FECTCH_WIKI_PAGE, FECTCH_WIKI_PAGE_SUCCESS, FECTCH_WIKI_PAGE_FAIL,
	INITIALIZE_WIKI_FORM, 
	CLICK_SUBMIT, CREATE_SECTION_VERSION_SUCCESS, CREATE_SECTION_VERSION_FAIL
} from '../actions/wiki';

const initialState=
{
	error: null,
	fetching: false,
	submitting: false,
	needReload: false,
	uploadSuccess: false,
	uploadError: null,
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

		// submit new section version
		case CLICK_SUBMIT: 
			return Object.assign({}, state, {
				submitting: true,
				uploadSuccess: false,
				uploadError: null
		    });
		case CREATE_SECTION_VERSION_SUCCESS:
			return Object.assign({}, state, {
				needReload: true,
				uploadSuccess: true,
				submitting: false,
				uploadError: null
		    });
		case CREATE_SECTION_VERSION_FAIL:
			return Object.assign({}, state, {
				submitting: false,
				uploadSuccess: false,
				uploadError: action.error
		    });

		// fetch single page status
		case FECTCH_WIKI_PAGE_SUCCESS:
			return Object.assign({}, state, {
				wiki: action.wiki,
				sections: action.sections,
				fetching: false,
				needReload: false,
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
				error: null,
				submitting: false,
				needReload: false,
				uploadSuccess: false,
				uploadError: null,
				editingSection: {
					title: action.title,
					content: action.content
				}
			});

		default:
			return state
	}
}