import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import TermExtractor from '../TermExtractor';
import AddTerm from '../TermExtractor/AddTerm';

const setup = (props = {}) => mount(
  <TestProvider>
    <TermExtractor {...props} />
  </TestProvider>,
);

describe('<TermExtractor />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should be collapsed by default', () => {
    expect(wrapper.find('button.btn-toggle').text()).toEqual('Expand');
  });

  it('should expand when expanded', () => {
    wrapper.find('button.btn-toggle').simulate('click');

    expect(wrapper.find('button.btn-toggle').text()).toEqual('Collapse');
  });

  it('should show more AddTerm boxes on add term click', () => {
    wrapper.find('.add-term').simulate('click');

    expect(wrapper.find(AddTerm)).toHaveLength(4);
  });
});
