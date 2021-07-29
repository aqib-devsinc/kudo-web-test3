import React from 'react';
import { mount } from 'enzyme';
import { FormHelperText } from '@material-ui/core';
import fixtures from 'fixtures/home/deleteProjectModal';
import CustomModal from 'components/CustomModal';
import TestProvider from 'providers/TestProvider';
import DeleteProjectModal from '../DeleteProjectModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <DeleteProjectModal {...props} />
  </TestProvider>,
);

describe('<DeleteProjectModal />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should render in custom modal', () => {
    expect(wrapper.find(CustomModal)).toHaveLength(1);
  });

  it('should have passed project name', () => {
    expect(wrapper.find(FormHelperText).text()).toEqual(props.projectName);
  });

  it('should have cancel button', () => {
    expect(wrapper.find('button').first().text()).toEqual('Cancel');
  });

  it('should have delete button', () => {
    expect(wrapper.find('button').at(1).text()).toEqual('Delete');
  });
});
