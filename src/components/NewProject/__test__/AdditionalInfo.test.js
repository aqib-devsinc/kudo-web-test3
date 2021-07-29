import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/additionalInfo';
import AdditionalInfo from '../AdditionalInfo';

const setup = () => mount(
  <TestProvider>
    <NewProjectFormProvider value={fixtures}>
      <AdditionalInfo />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<AdditionalInfo />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should not have primary language field for blank project', () => {
    expect(wrapper.find('input[name="primary_language"]')).toHaveLength(0);
  });

  it('should have secondary languages field', () => {
    expect(wrapper.find('input[name="secondary_languages"]')).toHaveLength(1);
  });

  it('should have description field', () => {
    expect(wrapper.find('textarea[name="description"]')).toHaveLength(1);
  });

  it('should have tags field', () => {
    expect(wrapper.find('input#tags')).toHaveLength(1);
  });

  it('should have client field', () => {
    expect(wrapper.find('input[name="client"]')).toHaveLength(1);
  });

  it('should have subject matter field', () => {
    expect(wrapper.find('input[name="subject_matter"]')).toHaveLength(1);
  });
});
