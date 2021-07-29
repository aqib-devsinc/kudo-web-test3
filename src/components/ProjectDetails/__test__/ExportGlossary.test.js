import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from '@material-ui/core';
import TestProvider from 'providers/TestProvider';
import fixtures from 'fixtures/projectDetails/exportGlossary';
import IconBox from 'components/IconBox';
import ExportGlossary from '../Glossary/ExportGlossary';

const setup = (props = {}) => mount(
  <TestProvider>
    <ExportGlossary {...props} />
  </TestProvider>,
);

describe('<ExportGlossary />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have export glossay icon', () => {
    expect(wrapper.find(IconBox).exists()).toBeTruthy();
  });

  it('should show export menu on icon click', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find(MenuItem).exists()).toBeTruthy();
  });

  it('should have four file type export options', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find(MenuItem)).toHaveLength(4);
  });
});
