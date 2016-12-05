import {
  SAVE_STORY_CONTENT, RESET_EDITING_STORY,
  CLICKED_UPLOAD, UPLOAD_CONTENT_SUCCESS, UPLOAD_CONTENT_FAIL,
  CLICKED_FETCH, FETCH_STORIES_SUCCESS, FETCH_STORIES_FAIL,
  FETCH_SINGLE_STORY_SUCCESS, FETCH_SINGLE_STORY_FAIL
} from 'actions/stories';

const initialState=
{
  error: null,
  fetching: false,
  fetching_result: false,
  uploading: false,
  published: false,
  storyDetails: {
    title: '',
    content: '', 
    User: {name:''}
  },
  storyList: [{
    title: '',
    coverPhoto: '',
    User: {name:''}
  }],
  editingStory: {
    storyId: null,
    title: null,
    content: '<p>Share your life events here! :D </p>'
  }
}

export function stories(state=initialState, action) 
{
  switch (action.type) 
  {
    case FETCH_SINGLE_STORY_SUCCESS:
      return Object.assign({}, state, {
        storyDetails: action.story,
        error: null,
        fetching: false,
        fetching_result: true
        });


    case CLICKED_FETCH: 
      return Object.assign({}, state, {
        fetching_result: false,
        fetching: true
        });

    case FETCH_STORIES_SUCCESS:
      return Object.assign({}, state, {
            storyList: action.stories,
        error: null,
        fetching: false
        });

    case FETCH_SINGLE_STORY_FAIL:
    case FETCH_STORIES_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        fetching: false
        });


    case SAVE_STORY_CONTENT:
      return Object.assign({}, state, {
            editingStory: {
          title: state.editingStory.title,
          content: action.content
            }
        });

    case CLICKED_UPLOAD:
      return Object.assign({}, state, {
        uploading: true,
        published: false,
        error: null
      });

    case UPLOAD_CONTENT_SUCCESS:
      return Object.assign({}, state, {
        error: null, 
        uploading: false,
        published: true,
        editingStory: {
          storyId: action.story.id
            }
      });

    case UPLOAD_CONTENT_FAIL:
      return Object.assign({}, state, {
        uploading: false,
        published: false,
        error: action.error
      });

    case RESET_EDITING_STORY:
      return Object.assign({}, state, {
        error: null,
        fetching: false,
        fetching_result: false,
        uploading: false,
        published: false,
        editingStory: {
          storyId: null,
          title: null,
          content: '<p>Share your life events here! :D </p>'
        }
      });

    default:
      return state
  }
}