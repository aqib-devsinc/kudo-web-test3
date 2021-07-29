import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/shareType';
import ShareType from '../ShareType';

const setup = (contextProps) => mount(
  <TestProvider>
    <NewProjectFormProvider value={contextProps}>
      <ShareType />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<ShareType />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(fixtures);
  });

  it('should have share type field', () => {
    expect(wrapper.find('input[name="share_type"]')).toHaveLength(1);
  });

  it('should have only one input field in case of private type', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
