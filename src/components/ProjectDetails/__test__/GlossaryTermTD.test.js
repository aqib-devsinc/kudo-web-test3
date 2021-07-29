import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/editable';
import GlossaryTermTD from '../Glossary/GlossaryTermTD';

const setup = (props = {}) => mount(
  <TestProvider>
    <GlossaryTermTD {...props} />
  </TestProvider>,
);

describe('<GlossaryTermTD />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should be editable by default', () => {
    wrapper.simulate('click');
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should have new value on change', () => {
    wrapper.simulate('click');
    wrapper.find('input').simulate('change', { target: { value: fixtures.newValue } });
    expect(wrapper.find('input').instance().value).toEqual(fixtures.newValue);
  });
});
