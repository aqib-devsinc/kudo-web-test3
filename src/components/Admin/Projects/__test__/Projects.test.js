import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import DataTable from 'components/Admin/DataTable';
import Projects from '..';

const setup = (props = {}) => mount(
  <TestProvider>
    <Projects {...props} />
  </TestProvider>,
);

describe('<Projects />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have DataTable', () => {
    expect(wrapper.find(DataTable).exists()).toBeTruthy();
  });
});
