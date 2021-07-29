import React from 'react';
import { mount } from 'enzyme';
import fixtures from 'fixtures/customSwitch';
import CustomSwitch from '..';

describe('<CustomSwitch />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = mount(<CustomSwitch {...props} />);
  });

  it('should have correct label', () => {
    expect(wrapper.find('label').text()).toEqual(props.label);
  });

  it('should be correct state', () => {
    expect(wrapper.find('input').instance().checked).toEqual(props.checked);
  });
});
