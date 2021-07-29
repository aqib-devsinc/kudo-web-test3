import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/glossaryTerm';
import GlossaryTerm from '../Glossary/GlossaryTerm';
import TerminologyDetailAttribute from '../Glossary/TerminologyDetailAttribute';

const setup = (props = {}) => mount(
  <TestProvider>
    <GlossaryTerm {...props} />
  </TestProvider>,
);

describe('<GlossaryTerm />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should show five columns under translation', () => {
    expect(wrapper.find('td.term-trans-attr-col')).toHaveLength(5);
  });

  it('should have six TerminologyDetailAttribute', () => {
    expect(wrapper.find(TerminologyDetailAttribute)).toHaveLength(6);
  });
});
