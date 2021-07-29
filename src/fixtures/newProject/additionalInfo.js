import { PROJECT_TYPES, PRIMARY_LANGS } from 'constants/project';

export default {
  values: {
    primary_language: PRIMARY_LANGS.english.value,
    secondary_languages: Object.values(PRIMARY_LANGS),
    type: PROJECT_TYPES.blankProject.id,
    description: '',
    files: [],
  },
  activeProjectType: { id: PROJECT_TYPES.blankProject.id },
  errors: {},
  setFieldValue: jest.fn(),
};
