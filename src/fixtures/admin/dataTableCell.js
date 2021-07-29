export default {
  props: {
    value: 'type',
    row: {
      id: 7,
      name: 'test',
      type: 'url',
      share_type: 'private',
      interpreter: {
        id: 3,
        full_name: 'Nency',
      },
      terms_count: 101,
      status: 'Active',
      languages: {
        primary_language: 'eng',
        secondary_languages: ['deu'],
      },
    },
    dataTableType: 'admin',
  },
}
