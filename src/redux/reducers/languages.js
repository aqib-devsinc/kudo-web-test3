import actionTypes from 'redux/actions/actionTypes';
import initialState from './initialState';

const languagesReducer = (state = initialState.languages, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_LANGUAGES:
      return {
        ...state,
        all: payload.languages.map((language) => ({
          label: language.name,
          value: language.code,
        })),
      };

    default:
      return state;
  }
};

export default languagesReducer;
