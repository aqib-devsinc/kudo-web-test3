export default {
  props: {
    term: 'new test term',
    areTermsSavedRef: { current: false },
    onUpdateTerm: jest.fn(),
  },
};
