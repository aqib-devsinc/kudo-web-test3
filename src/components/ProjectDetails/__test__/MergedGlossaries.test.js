import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import IconBox from 'components/IconBox';
import CustomModal from 'components/CustomModal';
import CustomTextField from 'components/CustomTextField';
import fixtures from 'fixtures/projectDetails/mergeGlossary';
import MergedGlossaries from '../Glossary/MergedGlossaries';

const setup = (props = {}) => mount(
  <TestProvider>
    <MergedGlossaries {...props} />
  </TestProvider>,
);

describe('<MergedGlossaries />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have merge glossay icon', () => {
    expect(wrapper.find(IconBox).exists()).toBeTruthy();
  });

  it('should show merged glossaries modal on icon click', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find(CustomModal).exists()).toBeTruthy();
  });

  it('should have open glossary input field', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find(CustomTextField).exists()).toBeTruthy();
  });
});
