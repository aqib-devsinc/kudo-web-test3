import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import Home from '../index';

const setup = (props = {}) => mount(
  <TestProvider>
    <Home {...props} />
  </TestProvider>,
);

describe('<Home />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have home body', () => {
    expect(wrapper.find('#home-body')).toHaveLength(1);
  });
});
