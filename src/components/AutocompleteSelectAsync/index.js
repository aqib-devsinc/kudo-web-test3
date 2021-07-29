import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function AutocompleteSelectAsync({
  onOpen,
  onClose,
  endpoint,
  setFieldValue,
  textfieldProps,
  inputProps,
  ...restProps
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnOpen = () => {
    if (onOpen) onOpen();

    setOpen(true);
  };

  const handleOnClose = () => {
    if (onClose) onClose();

    setOpen(false);
  };

  const handleInputChange = ({ target: { value } }) => {
    setLoading(true);
    axios.get(`/${endpoint}?search_string=${value}`)
      .then(({ data }) => setOptions(Object.values(data)[0]))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleOptionChange = (e, selectedOption) => {
    setFieldValue(textfieldProps.name, selectedOption);
  };

  return (
    <Autocomplete
      open={open}
      onOpen={handleOnOpen}
      onClose={handleOnClose}
      onChange={handleOptionChange}
      loading={loading}
      options={options}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textfieldProps}
          onChange={handleInputChange}
          onKeyDown={({ keyCode, target: { value } }) => {
            if (keyCode === 13 && value) {
              setOptions([{
                name: value,
                id: null,
              }]);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color='inherit' size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...restProps}
    />
  );
}

AutocompleteSelectAsync.defaultProps = {
  onOpen: () => null,
  onClose: () => null,
  inputProps: {},
  restProps: {},
};

AutocompleteSelectAsync.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  endpoint: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  textfieldProps: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  restProps: PropTypes.object,
};
