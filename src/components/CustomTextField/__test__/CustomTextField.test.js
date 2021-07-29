import React from 'react';
import { mount } from 'enzyme';
import fixtures from 'fixtures/customTextField';
import CustomTextField from '..';

describe('<CustomTextField />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = mount(<CustomTextField {...props} />);
  });

  it('should have correct name', () => {
    expect(wrapper.find('input').instance().name).toEqual(props.name);
  });

  it('should have correct value', () => {
    expect(wrapper.find('input').instance().value).toEqual(props.value);
  });

  it('should have correct placeholder', () => {
    expect(wrapper.find('input').instance().placeholder).toEqual(props.placeholder);
  });

  it('should have correct error message', () => {
    expect(wrapper.find('p.Mui-error').text()).toEqual(props.error);
  });

  it('should have correct class', () => {
    expect(wrapper.props().className).toEqual(props.className);
  });
});
