import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import CustomModal from 'components/CustomModal';
import fixtures from 'fixtures/projectDetails/FileDeleteConfirmationModal';
import FileCorpusViewModal from '../FileUploaded/FileDeleteConfirmationModal';

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
    expect(wrapper.find('.MuiDialogContent-root b').text()).toEqual(fixtures.props.file.name);
  });

  it('should have a close modal button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});
