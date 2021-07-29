import React from 'react';
import { mount } from 'enzyme';
import { TableCell } from '@material-ui/core';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/admin/dataTableCell';
import DataTableCell from '../DataTableCell';

const setup = (props = {}) => mount(
  <TestProvider>
    <DataTableCell {...props} />
  </TestProvider>,
);

describe('<DataTableCell />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have TableCell component', () => {
    expect(wrapper.find(TableCell).exists()).toBeTruthy();
  });
});
