import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import Projects from 'components/Admin/Projects';
import Dashboard from '..';

const setup = (props = {}) => mount(
  <TestProvider>
    <Dashboard {...props} />
  </TestProvider>,
);

describe('<Dashboard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have Projects', () => {
    expect(wrapper.find(Projects).exists()).toBeTruthy();
  });
});
