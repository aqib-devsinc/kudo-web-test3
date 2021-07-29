import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import HomeHeader from '../HomeHeader';

const setup = (props = {}) => mount(
  <TestProvider>
    <HomeHeader {...props} />
  </TestProvider>,
);

describe('<HomeHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have create project input', () => {
    expect(wrapper.find('input[name="project_name"]')).toHaveLength(1);
  });

  it('should have create project btn', () => {
    expect(wrapper.find('.create-project-btn')).toHaveLength(1);
  });
});
