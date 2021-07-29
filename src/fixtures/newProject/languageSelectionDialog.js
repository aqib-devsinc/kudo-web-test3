import { PRIMARY_LANGS } from 'constants/project';

export default {
  values: {
    files: [
      { attachment: { name: 'test.mp4' } },
      { attachment: { name: 'test2.pdf' } },
    ],
  },
  errors: {},
  setFieldValue: jest.fn(),
  props: {
    open: true,
    langSelectionFileExts: ['wav', 'mp4'],
    onClose: jest.fn(),
    onCancel: jest.fn(),
    fileLanguages: Object.values(PRIMARY_LANGS),
  },
};
