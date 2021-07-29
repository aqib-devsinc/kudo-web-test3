import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import Glossary from 'components/ProjectDetails/Glossary';
import TermExtractor from 'components/ProjectDetails/TermExtractor';
import Entities from 'components/ProjectDetails/Entities';
import FileUploaded from 'components/ProjectDetails/FileUploaded';
import ProjectDetails from '..';

const setup = (props = {}) => mount(
  <TestProvider>
    <ProjectDetails {...props} />
  </TestProvider>,
);

describe('<ProjectDetails />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have glossary', () => {
    expect(wrapper.find(Glossary).exists()).toBeTruthy();
  });

  it('should have manual terminology extractor', () => {
    expect(wrapper.find(TermExtractor).exists()).toBeTruthy();
  });

  it('should have entities section', () => {
    expect(wrapper.find(Entities).exists()).toBeTruthy();
  });

  it('should have uploaded files section', () => {
    expect(wrapper.find(FileUploaded).exists()).toBeTruthy();
  });
});
