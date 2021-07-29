export default {
  props: {
    open: true,
    file: {
      name: 'test file',
      corpus: 'some test corpus',
    },
    onClose: jest.fn(),
  },
};
