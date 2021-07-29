export default {
  props: {
    totalRows: 5,
    page: 1,
    totalPages: 1,
    perPage: 10,
    perPageOptions: [10, 20, 50, 100],
    onPageChange: jest.fn(),
    onPerPageChange: jest.fn(),
  },
}
