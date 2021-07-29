import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import actionTypes from 'redux/actions/actionTypes';
import initialState from './initialState';

const authReducer = persistReducer(
  {
    storage,
    key: 'auth',
    whitelist: ['user', 'token'],
  },
  (state = initialState.auth, action) => {
    switch (action.type) {
      case actionTypes.LOGIN: {
        const { user, token } = action.payload;

        user.full_name = `${user.first_name} ${user.last_name}`;
        return {
          ...state,
          user,
          token,
          isAuthenticated: true,
        };
      }

      case actionTypes.LOGOUT_SUCCESS: {
        return initialState.auth;
      }

      case actionTypes.SET_CURRENT_USER: {
        const { user } = action.payload;

        user.full_name = `${user.first_name} ${user.last_name}`;
        return {
          ...state,
          user,
          isAuthenticated: true,
        };
      }

      case actionTypes.SET_CURRENT_USER_ROLES: {
        return {
          ...state,
          user: {
            ...state.user,
            roles: action.payload.roles,
          },
        }
      }

      default:
        return state;
    }
  },
);

export default authReducer;
