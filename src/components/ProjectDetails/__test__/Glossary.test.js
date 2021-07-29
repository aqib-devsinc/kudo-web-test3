import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/glossaryTable';
import Glossary from '../Glossary';
import GlossaryTable from '../Glossary/GlossaryTable';
import ExportGlossary from '../Glossary/ExportGlossary';

const setup = (props = {}) => mount(
  <TestProvider>
    <Glossary {...props} />
  </TestProvider>,
);

describe('<Glossary />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have glossary table', () => {
    expect(wrapper.find(GlossaryTable).exists()).toBeTruthy();
  });

  it('should have show / hide columns menu', () => {
    expect(wrapper.find('.show-hide-cols').exists()).toBeTruthy();
  });

  it('should have export glossary menu', () => {
    expect(wrapper.find(ExportGlossary).exists()).toBeTruthy();
  });

  it('should have search glossary input field', () => {
    expect(wrapper.find('input[name="search-glossary"]').exists()).toBeTruthy();
  });
});
