import React from 'react';
import { mount } from 'enzyme';
import { Dropdown } from 'react-bootstrap';
import fixtures from 'fixtures/home/projectCard';
import TestProvider from 'providers/TestProvider';
import ProjectCard from '../ProjectCard';
import DeleteProjectModal from '../DeleteProjectModal';
import ProjectShareTypeModal from '../ProjectShareTypeModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <ProjectCard {...props} />
  </TestProvider>,
);

describe('<ProjectCard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(fixtures.props);
  });

  it('should have correct project name', () => {
    expect(wrapper.find('h4').text()).toEqual(fixtures.props.project.name);
  });

  it('shoud not intially render ProjectShareTypeModal', () => {
    expect(wrapper.find(ProjectShareTypeModal)).toHaveLength(0);
  });

  it('should not initially render DeleteProjectModal', () => {
    expect(wrapper.find(DeleteProjectModal)).toHaveLength(0);
  });

  it('should show project actions by clicking on options', () => {
    wrapper.find(Dropdown.Toggle).simulate('click');

    expect(wrapper.find(Dropdown.Item)).toHaveLength(2);
  });
});
