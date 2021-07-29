import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import CustomModal from 'components/CustomModal';
import fixtures from 'fixtures/admin/InterpreterToAdminConfirmationModal';
import InterpreterToAdminConfirmationModal from '../InterpreterToAdminConfirmationModal';

const setup = (props = {}) => mount(
  <TestProvider>
    <InterpreterToAdminConfirmationModal {...props} />
  </TestProvider>,
);

describe('<InterpreterToAdminConfirmationModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(fixtures.props);
  });

  it('should render in custom modal', () => {
    expect(wrapper.find(CustomModal).exists()).toBeTruthy();
  });

  it('should show pass interpreter name', () => {
    expect(wrapper.find('.MuiDialogContent-root b').text()).toEqual(fixtures.props.interpreter.name);
  });

  it('should have a close modal button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
  });
});
