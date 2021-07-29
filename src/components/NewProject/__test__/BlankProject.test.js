import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/blankProject';
import BlankProject from '../BlankProject';
import AdditionalInfo from '../AdditionalInfo';
import ShareType from '../ShareType';

const setup = () => mount(
  <TestProvider>
    <NewProjectFormProvider value={fixtures}>
      <BlankProject />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<BlankProject />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have AdditionalInfo component', () => {
    expect(wrapper.find(AdditionalInfo)).toHaveLength(1);
  });

  it('should not have primary language field', () => {
    expect(wrapper.find('input[name="primary_language"]')).toHaveLength(0);
  });

  it('should have ShareType component', () => {
    expect(wrapper.find(ShareType)).toHaveLength(1);
  });
});
