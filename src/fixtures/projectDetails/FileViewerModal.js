export default {
  props: {
    open: true,
    file: {
      id: 1,
      metadata: { name: 'test file' },
    },
    onClose: jest.fn(),
  },
};
