import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import CustomModal from 'components/CustomModal';
import fixtures from 'fixtures/projectDetails/mergeGlossary';
import MergeGlossary from '../Glossary/MergeGlossary';

const setup = (props = {}) => mount(
  <TestProvider>
    <MergeGlossary {...props} />
  </TestProvider>,
);

describe('<MergeGlossary />', () => {
  let wrapper;

  const { props } = fixtures;

  beforeEach(() => {
    wrapper = setup(props);
  });

  it('should have merge glossay icon', () => {
    expect(wrapper.find('button').text()).toEqual('Add / Remove Glossary');
  });

  it('should show merge glossary modal on icon click', () => {
    wrapper.find('button').first().simulate('click');

    expect(wrapper.find(CustomModal).exists()).toBeTruthy();
  });

  it('should have add/remove glossary input field', () => {
    wrapper.find('button').first().simulate('click');

    expect(wrapper.find('input[name="add-project-glossary"]').exists()).toBeTruthy();
  });
});
