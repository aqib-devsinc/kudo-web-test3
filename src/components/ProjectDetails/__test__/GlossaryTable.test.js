import React from 'react';
import { mount } from 'enzyme';
import { Table } from '@material-ui/core';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/glossaryTable';
import GlossaryTable from '../Glossary/GlossaryTable';
import GlossaryTerm from '../Glossary/GlossaryTerm';
import GlossaryTablePagination from '../Glossary/GlossaryTablePagination';

const setup = (props = {}) => mount(
  <TestProvider>
    <GlossaryTable {...props} />
  </TestProvider>,
);

describe('<GlossaryTable />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have show terms in table', () => {
    expect(wrapper.find(Table).exists()).toBeTruthy();
  });

  it('should have 10 terms', () => {
    expect(wrapper.find(GlossaryTerm)).toHaveLength(10);
  });

  it('should have pagination component', () => {
    expect(wrapper.find(GlossaryTablePagination).exists()).toBeTruthy();
  });
});
