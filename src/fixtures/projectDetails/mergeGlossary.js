export default {
  props: {
    mergedProjects: [
      {
        id: 1,
        name: 'project 1',
      },
      {
        id: 2,
        name: 'project 2',
      },
    ],
    setMergedProjects: jest.fn(),
  },
};
