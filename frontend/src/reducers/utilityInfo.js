import {
	FETCH_ALL_UNIVERSITIES, FETCH_All_UNIVERSITIES_SUCCESS, FETCH_All_UNIVERSITIES_FAILURE, RESET_All_UNIVERSITIES,
	FIND_UNI_DOMAIN
} from '../actions/utilityInfo';

//designing state shape
const initialState = {
  universitiesList: {universities: [{name:"NUS"}], error: null, loading: false},
  emailDomains: []
}

export function utilityInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_UNIVERSITIES:
      return {...state, universitiesList: {universities:[], error: null, loading: true}};
	case FETCH_All_UNIVERSITIES_SUCCESS:
		return {...state, universitiesList: {universities: action.payload, error: null, loading: false}};
	case FETCH_All_UNIVERSITIES_FAILURE:
		var error = action.payload || {message: action.payload};
		return {...state, universitiesList: {universities: [], error: error, loading: false}};
	case RESET_All_UNIVERSITIES:
		return {...state, universitiesList: {universities: [], error: null, loading: false}};
	case FIND_UNI_DOMAIN:
		return {...state, emailDomains: action.emailDomains}

    default:
      return state
  }
}