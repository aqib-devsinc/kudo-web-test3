import actionTypes from 'redux/actions/actionTypes';
import initialState from './initialState';

const modalReducer = (state = initialState.modal, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.OPEN_MODAL: {
      return {
        ...state, isOpen: true,
      };
    }

    case actionTypes.CLOSE_MODAL: {
      return {
        ...state, isOpen: false,
      };
    }

    default:
      return state;
  }
};

export default modalReducer;
