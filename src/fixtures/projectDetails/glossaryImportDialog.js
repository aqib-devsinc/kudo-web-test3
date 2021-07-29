export default {
  props: {
    glossaries: [
      ['term1', 'term1'],
      ['term2', 'term2'],
    ],
    open: true,
    onClose: jest.fn(),
  },
};
