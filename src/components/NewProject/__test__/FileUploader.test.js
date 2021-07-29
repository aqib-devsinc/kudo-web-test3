import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/additionalInfo';
import FileUploader from '../FileUploader';

const setup = () => mount(
  <TestProvider>
    <NewProjectFormProvider value={fixtures}>
      <FileUploader name='files' />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<FileUploader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have only one input field', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should have files input field', () => {
    expect(wrapper.find('input[name="files"]')).toHaveLength(1);
  });
});
