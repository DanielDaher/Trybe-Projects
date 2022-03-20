import { REQUEST_API, GET_GAME, GET_CATEGORIES, SET_SETTINGS } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  gameData: [],
  categories: { trivia_categories: [] },
  settings: {
    category: '',
    level: '',
    nQuestions: 5,
    type: '' },
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_GAME:
    return {
      ...state,
      isLoading: false,
      gameData: action.data,
    };
  case GET_CATEGORIES:
    return {
      ...state,
      isLoading: false,
      categories: action.data,
    };
  case SET_SETTINGS:
    return {
      ...state,
      settings: action.data,
    };
  default:
    return state;
  }
}

export default gameReducer;
