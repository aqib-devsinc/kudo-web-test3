import { SHARE_TYPES } from 'constants/project';

export default {
  props: {
    open: true,
    onClose: jest.fn(),
    project: {
      id: 1,
      share_type: SHARE_TYPES.private.value,
    },
  },
};
