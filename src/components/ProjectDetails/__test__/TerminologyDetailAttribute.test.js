import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/terminologyDetailAttribute';
import TerminologyDetailAttribute from '../Glossary/TerminologyDetailAttribute';

const setup = (props = {}) => mount(
  <TestProvider>
    <TerminologyDetailAttribute {...props} />
  </TestProvider>,
);

describe('<TerminologyDetailAttribute />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should show provided label', () => {
    expect(wrapper.find('p').first().text()).toEqual(props.label);
  });

  it('should show provided value', () => {
    expect(wrapper.find('p').at(1).text()).toEqual(props.value);
  });
});
