import React from 'react';
import { mount } from 'enzyme';
import { Row } from 'react-bootstrap';
import TestProvider from 'providers/TestProvider';
import FileUploaded from '../FileUploaded';

const setup = (props = {}) => mount(
  <TestProvider>
    <FileUploaded {...props} />
  </TestProvider>,
);

describe('<FileUploaded />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should show one file', () => {
    expect(wrapper.find(Row)).toHaveLength(1);
  });

  it('should have download file option', () => {
    expect(wrapper.find('a[target="_blank"]')).toHaveLength(1);
  });
});
