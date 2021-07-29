import React from 'react';
import { mount } from 'enzyme';
import { Autocomplete } from '@material-ui/lab';
import fixtures from 'fixtures/autoCompleteSelectAsync';
import AutocompleteSelectAsync from '..';

describe('<AutocompleteSelectAsync />', () => {
  let wrapper;
  const { props } = fixtures;

  beforeEach(() => {
    wrapper = mount(<AutocompleteSelectAsync {...props} />);
  });

  it('should have auto complete input', () => {
    expect(wrapper.find(Autocomplete)).toHaveLength(1);
  });
});
