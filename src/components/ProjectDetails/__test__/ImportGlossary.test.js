import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import IconBox from 'components/IconBox';
import ImportGlossary from '../Glossary/ImportGlossary';

const setup = (props = {}) => mount(
  <TestProvider>
    <ImportGlossary {...props} />
  </TestProvider>,
);

describe('<ImportGlossary />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have import glossay icon', () => {
    expect(wrapper.find(IconBox).exists()).toBeTruthy();
  });

  it('should have import glossary input field', () => {
    wrapper.find(IconBox).simulate('click');

    expect(wrapper.find('input[type="file"]').exists()).toBeTruthy();
  });
});
