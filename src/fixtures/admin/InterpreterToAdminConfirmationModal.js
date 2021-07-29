export default {
  props: {
    open: true,
    interpreter: {
      interpreterId: 1,
      name: 'test file',
    },
    assignRoles: ['admin'],
    onClose: jest.fn(),
  },
};
