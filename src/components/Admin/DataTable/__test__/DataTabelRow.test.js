import React from 'react';
import { mount } from 'enzyme';
import {
  TableRow,
  TableCell,
} from '@material-ui/core';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/admin/dataTableRow';
import DataTableRow from '../DataTableRow';
import DataTableCell from '../DataTableCell';

const setup = (props = {}) => mount(
  <TestProvider>
    <DataTableRow {...props} />
  </TestProvider>,
);

describe('<DataTableRow />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have DataTableCell component', () => {
    expect(wrapper.find(DataTableCell).exists()).toBeTruthy();
  });

  it('should have TableCell component', () => {
    expect(wrapper.find(TableCell).exists()).toBeTruthy();
  });

  it('should have TableRow component', () => {
    expect(wrapper.find(TableRow).exists()).toBeTruthy();
  });
});
