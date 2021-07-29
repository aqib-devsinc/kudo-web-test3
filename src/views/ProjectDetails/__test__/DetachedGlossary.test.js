import React from 'react';
import { mount } from 'enzyme';
import TestProvider from 'providers/TestProvider';
import Glossary from 'components/ProjectDetails/Glossary';
import TermExtractor from 'components/ProjectDetails/TermExtractor';
import Entities from 'components/ProjectDetails/Entities';
import FileUploaded from 'components/ProjectDetails/FileUploaded';
import DetachedGlossary from '../DetachedGlossary';

const setup = (props = {}) => mount(
  <TestProvider>
    <DetachedGlossary {...props} />
  </TestProvider>,
);

describe('<DetachedGlossary />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should have glossary', () => {
    expect(wrapper.find(Glossary).exists()).toBeTruthy();
  });

  it('should not have manual terminology extractor', () => {
    expect(wrapper.find(TermExtractor).exists()).toBeFalsy();
  });

  it('should not have entities section', () => {
    expect(wrapper.find(Entities).exists()).toBeFalsy();
  });

  it('should not have uploaded files section', () => {
    expect(wrapper.find(FileUploaded).exists()).toBeFalsy();
  });
});
