export default {
  props: {
    open: true,
    interpreter: {
      id: 1,
      name: 'test file',
      roles: ['admin'],
    },
    onClose: jest.fn(),
  },
};
