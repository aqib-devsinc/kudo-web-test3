import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/addTerm';
import AddTerm from '../TermExtractor/AddTerm';

const setup = (props = {}) => mount(
  <TestProvider>
    <AddTerm {...props} />
  </TestProvider>,
);

describe('<AddTerm />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have term input field', () => {
    expect(wrapper.find('input[name="term"]').exists()).toBeTruthy();
  });

  it('should have textarea for corpus', () => {
    expect(wrapper.find('textarea[name="description"]').exists()).toBeTruthy();
  });

  it('should have file input field', () => {
    expect(wrapper.find('input[name="file"]').exists()).toBeTruthy();
  });
});
