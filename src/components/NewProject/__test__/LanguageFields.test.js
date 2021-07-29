import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/additionalInfo';
import LanguageFields from '../LanguageFields';

const setup = () => mount(
  <TestProvider>
    <NewProjectFormProvider value={fixtures}>
      <LanguageFields />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<LanguageFields />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have only two input fields', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('should have primary language field', () => {
    expect(wrapper.find('input[name="primary_language"]')).toHaveLength(1);
  });

  it('should have secondary languages field', () => {
    expect(wrapper.find('input[name="secondary_languages"]')).toHaveLength(1);
  });
});
