import React from 'react';
import { mount } from 'enzyme';
import fixtures from 'fixtures/home/projectShareTypeModal';
import CustomModal from 'components/CustomModal';
import TestProvider from 'providers/TestProvider';
import { SHARE_TYPES } from 'constants/project';
import ProjectShareTypeModal from '../ProjectShareTypeModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <ProjectShareTypeModal {...props} />
  </TestProvider>,
);

describe('<ProjectShareTypeModal />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should render in custom modal', () => {
    expect(wrapper.find(CustomModal)).toHaveLength(1);
  });

  it('should update share type on change', () => {
    wrapper.find('input[name="share_type"]').simulate('change', { target: { value: SHARE_TYPES.shared.value } });

    expect(wrapper.find('input[name="share_type"]').instance().value).toEqual(props.project.share_type);
  });

  it('should have cancel button', () => {
    expect(wrapper.find('button').first().text()).toEqual('Cancel');
  });

  it('should have save button', () => {
    expect(wrapper.find('button').at(1).text()).toEqual('Save');
  });
});
