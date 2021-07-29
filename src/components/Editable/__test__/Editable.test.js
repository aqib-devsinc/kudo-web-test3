import React from 'react';
import { mount } from 'enzyme';
import fixtures from 'fixtures/editable';
import Editable from '..';

describe('<Editable />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = mount(<Editable {...props} />);
  });

  it('should not be editable by default', () => {
    expect(wrapper.find('input')).toHaveLength(0);
  });

  it('should be editable when clicked', () => {
    wrapper.simulate('click');
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should have new value on change', () => {
    wrapper.simulate('click');
    wrapper.find('input').simulate('change', { target: { value: fixtures.newValue } });
    expect(wrapper.find('input').instance().value).toEqual(fixtures.newValue);
  });
});
