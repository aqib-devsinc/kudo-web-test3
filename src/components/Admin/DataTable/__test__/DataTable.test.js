import React from 'react';
import { mount } from 'enzyme';
import { Table } from '@material-ui/core';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/admin/dataTable';
import DataTable from '../index';
import DataTableRow from '../DataTableRow';
import DataTabelPagination from '../DataTablePagination';

const setup = (props = {}) => mount(
  <TestProvider>
    <DataTable {...props} />
  </TestProvider>,
);

describe('<DataTable />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have show terms in table', () => {
    expect(wrapper.find(Table).exists()).toBeTruthy();
  });

  it('should have DataTableRow component', () => {
    expect(wrapper.find(DataTableRow).exists()).toBeTruthy();
  });

  it('should have pagination component', () => {
    expect(wrapper.find(DataTabelPagination).exists()).toBeTruthy();
  });
});
