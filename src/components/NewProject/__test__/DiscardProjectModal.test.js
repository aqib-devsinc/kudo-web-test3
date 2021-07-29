import React from 'react';
import { mount } from 'enzyme';
import fixtures from 'fixtures/newProject/discardProjectModal';
import CustomModal from 'components/CustomModal';
import TestProvider from 'providers/TestProvider';
import DiscardProjectModal from '../DiscardProjectModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <DiscardProjectModal {...props} />
  </TestProvider>,
);

describe('<DiscardProjectModal />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should render in custom modal', () => {
    expect(wrapper.find(CustomModal)).toHaveLength(1);
  });

  it('should have discard cancel button', () => {
    expect(wrapper.find('button').first().text()).toEqual('No');
  });

  it('should have discard confirmation button', () => {
    expect(wrapper.find('button').at(1).text()).toEqual('Yes');
  });
});
