export default {
  props: {
    open: true,
    file: {
      id: 1,
      name: 'test file',
      corpus: 'some test corpus',
    },
    onClose: jest.fn(),
  },
};
