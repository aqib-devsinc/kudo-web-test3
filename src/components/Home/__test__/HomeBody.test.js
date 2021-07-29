import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import HomeBody from '../HomeBody';

const setup = (props = {}) => mount(
  <TestProvider>
    <HomeBody {...props} />
  </TestProvider>,
);

describe('<HomeBody />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have 3 project tabs', () => {
    expect(wrapper.find('button[role="tab"]')).toHaveLength(4);
  });

  it('should have grid view selector', () => {
    expect(wrapper.find('img[alt="grid-view"]')).toHaveLength(1);
  });

  it('should have list view selector', () => {
    expect(wrapper.find('img[alt="list-view"]')).toHaveLength(1);
  });

  it('should have project search field', () => {
    expect(wrapper.find('input[aria-label="Search"]')).toHaveLength(1);
  });
});
