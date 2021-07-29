export default {
  props: {
    page: 1,
    totalRows: 10,
    totalPages: 1,
    perPage: 10,
    perPageOptions: [10, 20],
    onPageChange: jest.fn(),
    onPerPageChange: jest.fn(),
  },
};
