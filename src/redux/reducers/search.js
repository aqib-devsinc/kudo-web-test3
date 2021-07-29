import actionTypes from 'redux/actions/actionTypes';
import initialState from './initialState';

const searchReducer = (state = initialState.search, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state, results: payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
