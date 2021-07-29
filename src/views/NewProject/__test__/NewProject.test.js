import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import DiscardProjectModal from 'components/NewProject/DiscardProjectModal';
import FileUploader from 'components/NewProject/FileUploader';
import NewProject, { ProjectTypeRadio } from '../index';

const setup = (props = {}) => mount(
  <TestProvider>
    <NewProject {...props} />
  </TestProvider>,
);

describe('<NewProject />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have four project type radio', () => {
    expect(wrapper.find(ProjectTypeRadio)).toHaveLength(4);
  });

  it('should show upload project by default', () => {
    expect(wrapper.find(FileUploader).exists()).toBeTruthy();
  });
  it('should have DiscardProjectModal', () => {
    expect(wrapper.find(DiscardProjectModal).exists()).toBeTruthy();
  });
});
