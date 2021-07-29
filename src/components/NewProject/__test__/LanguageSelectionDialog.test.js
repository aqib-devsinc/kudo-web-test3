import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import { NewProjectFormProvider } from 'context/newProjectForm';
import fixtures from 'fixtures/newProject/languageSelectionDialog';
import CustomModal from 'components/CustomModal';
import LanguageSelectionDialog from '../LanguageSelectionDialog';

const setup = (props, contextProps) => mount(
  <TestProvider>
    <NewProjectFormProvider value={contextProps}>
      <LanguageSelectionDialog {...props} />
    </NewProjectFormProvider>
  </TestProvider>,
);

describe('<LanguageSelectionDialog />', () => {
  let wrapper;
  const { props, ...contextProps } = fixtures;

  beforeEach(() => {
    wrapper = setup(props, contextProps);
  });

  it('should render in custom modal', () => {
    expect(wrapper.find(CustomModal)).toHaveLength(1);
  });

  it('should have only one input field for file language selection', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
