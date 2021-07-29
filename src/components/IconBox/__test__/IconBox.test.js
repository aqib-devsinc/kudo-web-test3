import React from 'react';
import { mount } from 'enzyme';
import SVG from 'react-inlinesvg';
import IconBox from '..';

describe('<IconBox />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <IconBox>
        <SVG src='/media/svg/icons/General/Visible.svg' />
      </IconBox>,
    );
  });

  it('should render icon as children', () => {
    expect(wrapper.find(SVG)).toHaveLength(1);
  });
});
