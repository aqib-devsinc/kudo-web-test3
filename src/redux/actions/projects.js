import actionTypes from './actionTypes';

export const setNewProjectName = (payload) => ({
  type: actionTypes.SET_NEW_PROJECT_NAME,
  payload,
});

export const resetNewProjectName = () => ({ type: actionTypes.RESET_NEW_PROJECT_NAME });

export const getProjectsRequest = (payload) => ({
  type: actionTypes.GET_PROJECTS_REQUEST,
  payload,
});

export const setProjectsSuccess = (payload) => ({
  type: actionTypes.SET_PROJECTS_SUCCESS,
  payload,
});

export const createProjectSuccess = (payload) => ({
  type: actionTypes.CREATE_PROJECT_SUCCESS,
  payload,
});

export const deleteProjectRequest = (payload) => ({
  type: actionTypes.DELETE_PROJECT_REQUEST,
  payload,
});

export const deleteProjectSuccess = (payload) => ({
  type: actionTypes.DELETE_PROJECT_SUCCESS,
  payload,
});

export const deleteProjectFileRequest = (payload) => ({
  type: actionTypes.DELETE_PROJECT_FILE_REQUEST,
  payload,
});

export const deleteProjectFileSuccess = (payload) => ({
  type: actionTypes.DELETE_PROJECT_FILE_SUCCESS,
  payload,
});

export const updateProjectSuccess = (payload) => ({
  type: actionTypes.UPDATE_PROJECT_SUCCESS,
  payload,
});

export const getProjectRequest = (payload) => ({
  type: actionTypes.GET_CURRENT_PROJECT_REQUEST,
  payload,
});

export const setCurrentProject = (payload) => ({
  type: actionTypes.SET_CURRENT_PROJECT,
  payload,
});

export const updateProjectSharing = (payload) => ({
  type: actionTypes.UPDATE_PROJECT_SHARING,
  payload,
});

export const getSearchedProjectsRequest = (payload) => ({
  type: actionTypes.GET_SEARCHED_PROJECTS_REQUEST,
  payload,
});

export const setSearchedProjects = (payload) => ({
  type: actionTypes.SET_SEARCHED_PROJECTS,
  payload,
});

export const addSearchedProjects = (payload) => ({
  type: actionTypes.ADD_SEARCHED_PROJECTS,
  payload,
});

export const getProjectGlossaryRequest = (payload) => ({
  type: actionTypes.GET_PROJECT_GLOSSARY_REQUEST,
  payload,
});

export const setProjectGlossary = (payload) => ({
  type: actionTypes.SET_PROJECT_GLOSSARY,
  payload,
});

export const setProjectGlossaryTerms = (payload) => ({
  type: actionTypes.SET_PROJECT_GLOSSARY_TERMS,
  payload,
});

export const setProjectGlossaryProcessable = (payload) => ({
  type: actionTypes.SET_PROJECT_GLOSSARY_PROCESSABLE,
  payload,
});

export const getProjectGlossaryStatsRequest = (payload) => ({
  type: actionTypes.GET_PROJECT_GLOSSARY_STATS_REQUEST,
  payload,
});

export const setProjectGlossaryStats = (payload) => ({
  type: actionTypes.SET_PROJECT_GLOSSARY_STATS,
  payload,
});

export const addTermRequest = (payload) => ({
  type: actionTypes.ADD_TERM_REQUEST,
  payload,
});

export const addTermSuccess = (payload) => ({
  type: actionTypes.ADD_TERM_SUCCESS,
  payload,
});

export const updateTermRequest = (payload) => ({
  type: actionTypes.UPDATE_TERM_REQUEST,
  payload,
});

export const updateTermSuccess = (payload) => ({
  type: actionTypes.UPDATE_TERM_SUCCESS,
  payload,
});

export const deleteTermsRequest = (payload) => ({
  type: actionTypes.DELETE_TERMS_REQUEST,
  payload,
});

export const deleteTermsSuccess = (payload) => ({
  type: actionTypes.DELETE_TERMS_SUCCESS,
  payload,
});

export const setGlossaryPage = (payload) => ({
  type: actionTypes.SET_GLOSSARY_PAGE,
  payload,
});

export const resetGlossary = () => ({ type: actionTypes.RESET_GLOSSARY });
