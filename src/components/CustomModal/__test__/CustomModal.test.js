import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import CustomModal from '..';

const setup = (props = {}) => mount(
  <TestProvider>
    <CustomModal {...props}>
      <p>Test modal</p>
    </CustomModal>
  </TestProvider>,
);

describe('<CustomModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ open: true });
  });

  it('should render one dialog', () => {
    expect(wrapper.find(CustomModal)).toHaveLength(1);
  });

  it('should have children', () => {
    expect(wrapper.find('p')).toHaveLength(1);
  });
});
