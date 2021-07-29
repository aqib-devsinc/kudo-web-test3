export default {
  props: {
    isEditing: false,
    headings: {
      interpreter: {
        label: 'Interpreter Name',
        value: 'interpreter',
        checked: true,
      },
      id: {
        label: 'Project ID',
        value: 'id',
        checked: true,
      },
      type: {
        label: 'Project Type',
        value: 'type',
        checked: true,
      },
      terms_count: {
        label: 'No. of Terms',
        value: 'terms_count',
        checked: true,
      },
      languages: {
        label: 'Languages',
        value: 'languages',
        checked: true,
      },
      status: {
        label: 'Status',
        value: 'status',
        checked: true,
      },
    },
    projects: [
      {
        id: 7,
        name: 'test',
        type: 'url',
        share_type: 'private',
        interpreter: {
          id: 3,
          full_name: 'None None',
        },
        terms_count: 101,
        status: 'Active',
        languages: {
          primary_language: 'eng',
          secondary_languages: ['deu'],
        },
      },
      {
        id: 7,
        name: 'test',
        type: 'url',
        share_type: 'private',
        interpreter: {
          id: 3,
          full_name: 'None None',
        },
        terms_count: 101,
        status: 'Active',
        languages: {
          primary_language: 'eng',
          secondary_languages: ['deu'],
        },
      },
      {
        id: 7,
        name: 'test',
        type: 'url',
        share_type: 'private',
        interpreter: {
          id: 3,
          full_name: 'None None',
        },
        terms_count: 101,
        status: 'Active',
        languages: {
          primary_language: 'eng',
          secondary_languages: ['deu'],
        },
      },
      {
        id: 7,
        name: 'test',
        type: 'url',
        share_type: 'private',
        interpreter: {
          id: 3,
          full_name: 'None None',
        },
        terms_count: 101,
        status: 'Active',
        languages: {
          primary_language: 'eng',
          secondary_languages: ['deu'],
        },
      },
      {
        id: 7,
        name: 'test',
        type: 'url',
        share_type: 'private',
        interpreter: {
          id: 3,
          full_name: 'None None',
        },
        terms_count: 101,
        status: 'Active',
        languages: {
          primary_language: 'eng',
          secondary_languages: ['deu'],
        },
      },
    ],
    totalRows: 5,
    page: 1,
    totalPages: 1,
    perPage: 10,
    handlePerPageChange: jest.fn(),
    handlePageChange: jest.fn(),
    dataTableType: 'admin',
  },
}
