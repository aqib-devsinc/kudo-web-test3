import actionTypes from 'redux/actions/actionTypes';
import initialState from './initialState';

const adminsReducers = (state = initialState.admin, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_ADMIN_PROJECTS_SUCCESS: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...payload.data,
          projects: payload.data.projects,
          total_records: payload.data.total_records,
          page: payload.page,
          perPage: payload.perPage,
        },
      };
    }

    case actionTypes.SET_ADMIN_PROJECTS_STATS_SUCCESS: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          statistics: payload.data.projects_statistics,
        },
      };
    }

    case actionTypes.SET_ADMIN_INTERPRETERS_SUCCESS: {
      return {
        ...state,
        interpreters: {
          ...state.interpreters,
          ...payload.data,
          data: payload.data.users,
          total_records: payload.data.total_records,
          page: payload.page,
          perPage: payload.perPage,
        },
      };
    }

    case actionTypes.SET_ADMIN_PROJECTS_PAGE: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          page: payload,
        },
      };
    }

    case actionTypes.SET_ADMIN_INTERPRETERS_ROLES: {
      const interpretersData = [...state.interpreters.data];
      const interpreterIndex = interpretersData.findIndex((interpreter) => interpreter.id === payload.id)

      if (interpreterIndex === -1) return state;

      interpretersData[interpreterIndex].roles = payload.roles;

      return {
        ...state,
        interpreters: {
          ...state.interpreters,
          data: [
            ...interpretersData,
          ],
        },
      };
    }

    default:
      return state;
  }
};

export default adminsReducers;
