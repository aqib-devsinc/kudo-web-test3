export default {
  props: {
    isEditing: false,
    languageCols: {
      eng: {
        value: 'eng',
        label: 'English',
        cols: [
          {
            label: 'Term',
            value: 'name',
            checked: true,
          },
          {
            label: 'Abbreviation',
            value: 'abbreviation',
            checked: true,
          },
          {
            label: 'POS',
            value: 'pos',
            checked: true,
          },
          {
            label: 'Example',
            value: 'example',
            checked: true,
          },
          {
            label: 'Source',
            value: 'source',
            checked: true,
          },
        ],
      },
    },
    checkedTermsRef: { current: [] },
    toggleTermsDeleted: false,
    searchTerm: '',
    isNewTermAdded: false,
    searchFilter: {
      lang: '',
      col: '',
    },
    query: {
      page: 1,
      per_page: 10,
      order: 'asc',
      order_by: 'name',
    },
    mergedProjects: [],
    setQuery: jest.fn(),
    setIsNewTermAdded: jest.fn(),
    handleColsOrderChange: jest.fn(),
  },
};
