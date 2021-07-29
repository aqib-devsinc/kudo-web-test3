import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import CustomModal from 'components/CustomModal';
import fixtures from 'fixtures/projectDetails/fileCorpusViewModal';
import FileCorpusViewModal from '../FileUploaded/FileCorpusViewModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <FileCorpusViewModal {...props} />
  </TestProvider>,
);

describe('<FileCorpusViewModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(fixtures.props);
  });

  it('should render in custom modal', () => {
    expect(wrapper.find(CustomModal).exists()).toBeTruthy();
  });

  it('should show pass file name', () => {
    expect(wrapper.find('h6').text()).toEqual(fixtures.props.file.name);
  });

  it('should have a close modal button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});
