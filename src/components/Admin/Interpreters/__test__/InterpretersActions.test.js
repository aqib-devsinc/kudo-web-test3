import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import IconBox from 'components/IconBox';
import fixtures from 'fixtures/admin/InterpretersActions';
import InterpretersActions from '../InterpretersActions';
import InterpreterToAdminConfirmationModal from '../InterpreterToAdminConfirmationModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <InterpretersActions {...props} />
  </TestProvider>,
);

describe('<InterpretersActions />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(fixtures.props);
  });

  it('should render in IconBox', () => {
    expect(wrapper.find(IconBox).exists()).toBeTruthy();
  });

  it('should render in InterpreterToAdminConfirmationModal', () => {
    expect(wrapper.find(InterpreterToAdminConfirmationModal).exists()).toBeTruthy();
  });
});
