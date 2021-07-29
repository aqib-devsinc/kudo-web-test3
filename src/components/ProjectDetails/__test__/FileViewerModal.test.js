import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import CustomModal from 'components/CustomModal';
import fixtures from 'fixtures/projectDetails/FileViewerModal';
import FileCorpusViewModal from '../FileUploaded/FileViewerModal';

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

  it('should have a close modal button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});
