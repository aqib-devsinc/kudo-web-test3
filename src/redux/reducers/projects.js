import actionTypes from 'redux/actions/actionTypes';
import { SHARE_TYPES } from 'constants/project';
import { PROJECT_TABS } from 'constants/home';
import initialState from './initialState';

const filterAndUpdateProject = (projects, updatedProject) => projects.reduce((newProjects, project, index) => {
  if (project.id === updatedProject.id) {
    newProjects[index] = {
      ...projects[index],
      ...updatedProject,
    };
    return newProjects;
  }

  newProjects.push(project);
  return newProjects;
}, []);

const projectsReducers = (state = initialState.projects, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_NEW_PROJECT_NAME: {
      return {
        ...state,
        new: {
          ...state.new, name: action.payload,
        },
      };
    }

    case actionTypes.RESET_NEW_PROJECT_NAME: {
      return {
        ...state,
        new: {
          ...state.new, name: '',
        },
      };
    }

    case actionTypes.SET_PROJECTS_SUCCESS: {
      const { projectType, data: { projects, ...restAttrs } } = payload;

      return {
        ...state,
        [projectType]: {
          ...state[projectType],
          ...restAttrs,
          data: [...state[projectType].data, ...projects],
        },
      };
    }

    case actionTypes.SET_SEARCHED_PROJECTS: {
      const { projects, ...restAttrs } = payload;

      return {
        ...state,
        search: {
          ...state.search,
          ...restAttrs,
          data: projects,
        },
      };
    }

    case actionTypes.ADD_SEARCHED_PROJECTS: {
      const { projects, ...restAttrs } = payload;

      return {
        ...state,
        search: {
          ...state.search,
          ...restAttrs,
          data: [...state.search.data, ...projects],
        },
      };
    }

    case actionTypes.CREATE_PROJECT_SUCCESS: {
      const { project } = payload;

      const publicProjects = [...state.public.data];

      let privateTotalCount = state.private.total_records;
      let publicTotalCount = state.public.total_records;
      let allProjectsTotalCount = state.all.total_records;

      if (project.share_type === PROJECT_TABS.public.value) {
        publicProjects.unshift(project);
        publicTotalCount += 1;
      } else if (project.share_type === PROJECT_TABS.private.value) {
        privateTotalCount += 1;
      }

      allProjectsTotalCount += 1;

      return {
        ...state,
        private: {
          ...state.private,
          data: [project, ...state.private.data],
          total_records: privateTotalCount,
        },
        public: {
          ...state.public,
          data: publicProjects,
          total_records: publicTotalCount,
        },
        all: {
          ...state.all,
          data: [project, ...state.all.data],
          total_records: allProjectsTotalCount,
        },
        current: project,
      };
    }

    case actionTypes.DELETE_PROJECT_SUCCESS: {
      let privateTotalCount = state.private.total_records;
      let publicTotalCount = state.public.total_records;
      let allProjectsTotalCount = state.all.total_records;

      if (payload.share_type === PROJECT_TABS.public.value) {
        publicTotalCount -= 1;
      }

      privateTotalCount -= 1;
      allProjectsTotalCount -= 1;

      return {
        ...state,
        private: {
          ...state.private,
          total_records: privateTotalCount,
          data: state.private.data.filter((project) => project.id !== payload.id),
        },
        all: {
          ...state.all,
          total_records: allProjectsTotalCount,
          data: state.all.data.filter((project) => project.id !== payload.id),
        },
        public: {
          ...state.public,
          total_records: publicTotalCount,
          data: state.public.data.filter((project) => project.id !== payload.id),
        },
      };
    }

    case actionTypes.DELETE_PROJECT_FILE_SUCCESS: {
      const currentProject = { ...state.current };
      let tmpCurrentProjectFiles;

      if (currentProject.id === payload.id) {
        tmpCurrentProjectFiles = [...state.current.files];
        const index = tmpCurrentProjectFiles.map((file) => file.id).indexOf(payload.fileId);
        if (index !== -1) {
          tmpCurrentProjectFiles.splice(index, 1);
        }
      }

      const glossary_processable = !tmpCurrentProjectFiles.length ? false : state.current.glossary_processable;

      return {
        ...state,
        current: {
          ...state.current,
          files: [...tmpCurrentProjectFiles],
        },
        glossary: {
          ...state.glossary,
          glossary_processable,
        },
      }
    }

    case actionTypes.UPDATE_PROJECT_SHARING: {
      const privateProjects = [...state.private.data];
      const publicProjects = [...state.public.data];
      const allProjects = [...state.all.data];
      const currentProject = { ...state.current };

      let projectIndex = privateProjects.findIndex((project) => project.id === payload.id);

      if (projectIndex === -1) return state;

      privateProjects[projectIndex] = payload.project;

      projectIndex = allProjects.findIndex((project) => project.id === payload.id);

      allProjects[projectIndex] = payload.project;

      if (payload.oldShareType === SHARE_TYPES.public.value) { // share type changed from public
        publicProjects.filter((project) => project.id !== payload.id);
        state.public.total_records -= 1
      }

      let tmpCurrentProject;

      if (currentProject.id === payload.id) {
        tmpCurrentProject = { ...currentProject };
        tmpCurrentProject.share_type = payload.project.share_type;
        tmpCurrentProject.project_users = payload.project.project_users;
      }

      if (payload.project.share_type === SHARE_TYPES.public.value) { // share type changed to public
        publicProjects.push(payload.project);
        state.public.total_records += 1
      }

      return {
        ...state,
        private: {
          ...state.private,
          data: privateProjects,
        },
        all: {
          ...state.all,
          data: allProjects,
        },
        public: {
          ...state.public,
          data: publicProjects,
        },
        current: tmpCurrentProject,
      };
    }

    case actionTypes.UPDATE_PROJECT_SUCCESS: {
      const privateProjects = filterAndUpdateProject(state.private.data, payload);
      const allProjects = filterAndUpdateProject(state.all.data, payload);
      const sharedProjects = filterAndUpdateProject(state.shared.data, payload);

      const publicProjects = [...state.public.data];

      const projectIndex = publicProjects.findIndex((project) => project.id === payload.id);

      if (projectIndex !== -1) {
        if (payload.share_type === PROJECT_TABS.public.value) {
          publicProjects[projectIndex] = payload;
        } else {
          publicProjects.splice(projectIndex, 1);
        }
      }

      return {
        ...state,
        private: {
          ...state.private,
          data: privateProjects,
        },
        shared: {
          ...state.shared,
          data: sharedProjects,
        },
        all: {
          ...state.all,
          data: allProjects,
        },
        current: payload,
      };
    }

    case actionTypes.SET_CURRENT_PROJECT: {
      return {
        ...state, current: payload,
      };
    }

    case actionTypes.SET_PROJECT_GLOSSARY_TERMS: {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          terms: payload.terms,
        },
      };
    }

    case actionTypes.SET_PROJECT_GLOSSARY_PROCESSABLE: {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          glossary_processable: payload.glossary_processable,
        },
      }
    }

    case actionTypes.SET_PROJECT_GLOSSARY: {
      if (payload.reset) {
        const updatedState = {
          ...state,
          glossary: {
            ...payload.response,
            page: payload.page,
            per_page: payload.perPage,
            languages: payload.response.languages.map((language) => ({
              label: language.name,
              value: language.code,
            })),
          },
        };

        return updatedState;
      }

      const {
        response: {
          current_page,
          terms: newTerms,
          languages,
          ...restAttrs
        },
        page,
      } = payload;

      return {
        ...state,
        glossary: {
          ...state.glossary,
          current_page,
          ...restAttrs,
          languages: languages.map((language) => ({
            label: language.name,
            value: language.code,
          })),
          per_page: payload.perPage,
          page,
          terms: newTerms,
        },
      };
    }

    case actionTypes.ADD_TERM_SUCCESS: {
      const { terms, per_page, total_records, page } = state.glossary;
      let { total_pages, next_page } = state.glossary;
      const copiedTerms = [...terms];

      if (copiedTerms.length % per_page === 0) {
        total_pages += 1;
        next_page = next_page === null ? 2 : next_page + 1;
      }

      copiedTerms.splice(page === 1 ? 0 : ((page - 1) * per_page), 0, payload.terms[0]);

      return {
        ...state,
        glossary: {
          ...state.glossary,
          terms: copiedTerms,
          total_records: total_records + 1,
          total_pages,
          next_page,
        },
      };
    }

    case actionTypes.UPDATE_TERM_SUCCESS: {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          terms: state.glossary.terms.map((term) => {
            if (term.id === payload.term.id) return payload.term;

            return term;
          }),
        },
      };
    }

    case actionTypes.DELETE_TERMS_SUCCESS: {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          total_records: state.glossary.total_records - payload.length,
          terms: state.glossary.terms.filter((term) => !payload.includes(term?.id)),
        },
      };
    }

    case actionTypes.SET_GLOSSARY_PAGE: {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          page: payload,
        },
      };
    }

    case actionTypes.RESET_GLOSSARY: {
      return {
        ...state,
        glossary: {},
      };
    }

    case actionTypes.SET_PROJECT_GLOSSARY_STATS: {
      return {
        ...state,
        glossary: {
          ...state.glossary,
          statistics: payload.statistics,
        },
      }
    }

    default:
      return state;
  }
};

export default projectsReducers;
