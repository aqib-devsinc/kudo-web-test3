import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/uploadDocs';
import UploadDocs from '../UploadDocs';
import AdditionalInfo from '../AdditionalInfo';
import ShareType from '../ShareType';

const setup = () => mount(
  <TestProvider>
    <NewProjectFormProvider value={fixtures}>
      <UploadDocs />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<UploadDocs />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have AdditionalInfo component', () => {
    expect(wrapper.find(AdditionalInfo)).toHaveLength(1);
  });

  it('should have primary language field', () => {
    expect(wrapper.find('input[name="primary_language"]')).toHaveLength(1);
  });

  it('should have files field', () => {
    expect(wrapper.find('input[name="files"]')).toHaveLength(1);
  });

  it('should not have website url field', () => {
    expect(wrapper.find('input[name="url"]')).toHaveLength(0);
  });

  it('should have ShareType component', () => {
    expect(wrapper.find(ShareType)).toHaveLength(1);
  });
});
