import React from 'react';
import { mount } from 'enzyme';
import { Row } from 'react-bootstrap';
import TestProvider from 'providers/TestProvider';
import Entities from '../Entities';

const setup = (props = {}) => mount(
  <TestProvider>
    <Entities {...props} />
  </TestProvider>,
);

describe('<Entities />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should not have any entities', () => {
    expect(wrapper.find(Row)).toHaveLength(0);
  });
});
