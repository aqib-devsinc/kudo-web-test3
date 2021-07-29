import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import DataTable from 'components/Admin/DataTable';
import Interpreters from '..';

const setup = (props = {}) => mount(
  <TestProvider>
    <Interpreters {...props} />
  </TestProvider>,
);

describe('<Interpreters />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have Data Table', () => {
    expect(wrapper.find(DataTable).exists()).toBeTruthy();
  });
});
