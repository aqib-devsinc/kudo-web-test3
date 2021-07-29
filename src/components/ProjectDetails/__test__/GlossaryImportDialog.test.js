import React from 'react';
import { mount } from 'enzyme';
import { TableRow } from '@material-ui/core';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/glossaryImportDialog';
import CustomModal from 'components/CustomModal';
import GlossaryImportDialog from '../Glossary/GlossaryImportDialog';

const setup = (props = {}) => mount(
  <TestProvider>
    <GlossaryImportDialog {...props} />
  </TestProvider>,
);

describe('<GlossaryImportDialog />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have open in modal', () => {
    expect(wrapper.find(CustomModal).exists()).toBeTruthy();
  });

  it('should have provided rows', () => {
    expect(wrapper.find(TableRow)).toHaveLength(props.glossaries.length + 1);
  });
});
