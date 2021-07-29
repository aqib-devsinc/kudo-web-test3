import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/glossaryTablePagination';
import GlossaryTablePagination from '../Glossary/GlossaryTablePagination';

const setup = (props = {}) => mount(
  <TestProvider>
    <GlossaryTablePagination {...props} />
  </TestProvider>,
);

describe('<GlossaryTablePagination />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have per page change input field', () => {
    expect(wrapper.find('input[name="per_page"]').exists()).toBeTruthy();
  });

  it('should show displayed terms count', () => {
    expect(wrapper.find('small').exists()).toBeTruthy();
  });

  it('should show go to first page button', () => {
    expect(wrapper.find('.first-page').exists()).toBeTruthy();
  });

  it('should show go to previous page button', () => {
    expect(wrapper.find('.prev-page').exists()).toBeTruthy();
  });

  it('should show go to next page button', () => {
    expect(wrapper.find('.next-page').exists()).toBeTruthy();
  });

  it('should show go to last page button', () => {
    expect(wrapper.find('.last-page').exists()).toBeTruthy();
  });

  it('should show current page number', () => {
    expect(wrapper.find('.current-page').exists()).toBeTruthy();
  });
});
