const initialState = {
  auth: {
    user: {
      full_name: '',
      email: '',
    },
    token: null,
    isAuthenticated: false,
  },
  projects: {
    new: { name: '' },
    private: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    shared: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    public: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    all: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
    current: {},
    glossary: {},
    search: {
      current_page: 1,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
    },
  },
  search: {
    term: '',
    results: [],
  },
  modal: { isOpen: false },
  languages: { all: [] },
  admin: {
    dashboard: {
      current_page: 1,
      perPage: 10,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      statistics: {},
      total_records: 0,
    },
    interpreters: {
      current_page: 1,
      perPage: 10,
      next_page: null,
      previous_page: null,
      total_pages: 1,
      data: [],
      total_records: 0,
    },
  },
};

export default initialState;
