import React from 'react';
import { mount } from 'enzyme';
import fixtures from 'fixtures/home/projectsList';
import TestProvider from 'providers/TestProvider';
import ProjectsList from '../ProjectsList';
import ProjectCard from '../ProjectCard';

const setup = (props = {}) => mount(
  <TestProvider>
    <ProjectsList {...props} />
  </TestProvider>,
);

describe('<ProjectsList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(fixtures.props);
  });

  it('should have 3 projects', () => {
    expect(wrapper.find(ProjectCard)).toHaveLength(3);
  });
});
