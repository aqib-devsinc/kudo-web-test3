import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import Login from '../Login';

const setup = (props = {}) => mount(
  <TestProvider>
    <Login {...props} />
  </TestProvider>,
);

describe('<Login />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have sign in text', () => {
    const signinEl = wrapper.find('.signin-text');
    expect(signinEl).toHaveLength(1);
    expect(signinEl.text().toLowerCase()).toEqual('sign in with your kudo account');
  });

  it('should have email input', () => {
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
  });

  it('should have password input', () => {
    expect(wrapper.find('input[name="password"]')).toHaveLength(1);
  });

  it('should have submit button', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });
});
