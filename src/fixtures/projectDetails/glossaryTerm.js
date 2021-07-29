export default {
  props: {
    isEditing: false,
    status: 'Revised',
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
    translations: [{
      name: 'name',
      abbreviation: 'abbreviation',
      pos: 'pos',
      example: 'example',
      source: 'source',
      language: 'eng',
    }],
    allChecked: false,
    onCheckChange: jest.fn(),
  },
};
