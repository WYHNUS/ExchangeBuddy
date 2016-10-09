import {FETCH_ALL_UNIVERSITIES, FETCH_All_UNIVERSITIES_SUCCESS, FETCH_All_UNIVERSITIES_FAILURE, RESET_All_UNIVERSITIES} from '../actions/utilityInfo';

//designing state shape
const initialState = {
  universities: {universities: [], error: null, loading: false},
}

function utilityInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_UNIVERSITIES:
      return {...state, universities: {universities:[], error: null, loading: true}};
	case FETCH_All_UNIVERSITIES_SUCCESS:
		return {...state, universities: {universities: action.payload, error: null, loading: false}};
	case FETCH_All_UNIVERSITIES_FAILURE:
		var error = action.payload || {message: action.payload};
		return {...state, universities: {universities: [], error: error, loading: false}};
	case RESET_All_UNIVERSITIES:
		return {...state, universities: {universities: [], error: null, loading: false}}

    default:
      return state
  }
}