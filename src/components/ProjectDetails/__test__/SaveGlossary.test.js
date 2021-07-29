import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import IconBox from 'components/IconBox';
import CustomModal from 'components/CustomModal';
import SaveGlossary from '../Glossary/SaveGlossary';

const setup = (props = {}) => mount(
  <TestProvider>
    <SaveGlossary {...props} />
  </TestProvider>,
);

describe('<SaveGlossary />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ mergedProjectIds: [1] });
  });

  it('should have save glossay icon', () => {
    expect(wrapper.find(IconBox).exists()).toBeTruthy();
  });

  it('should show save glossary modal on icon click', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find(CustomModal).exists()).toBeTruthy();
  });

  it('should have save glossary input field', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find('input#save-glossary').exists()).toBeTruthy();
  });
});
