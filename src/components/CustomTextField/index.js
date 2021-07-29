import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from 'styles/customTextField';

export default function CustomTextField({
  className,
  inputProps,
  select,
  value,
  placeholder,
  children,
  helperText,
  error,
  ...restProps
}) {
  const classes = useStyles();

  const inputClasses = `
    ${classes.inputStyles} ${inputProps?.className ?? ''}
    ${select && value === '' ? classes.selectPlaceholder : ''}
  `;

  return (
    <TextField
      select={select}
      value={select && value === '' ? 'null' : value}
      className={`${classes?.select ?? ''} ${className || ''}`}
      placeholder={placeholder}
      helperText={helperText || error}
      error={!!error}
      inputProps={{
        ...inputProps,
        className: restProps.inputClasses || inputClasses,
      }}
      {...restProps}
    >
      {
        select && placeholder && (
          <MenuItem value='null' disabled>
            { placeholder }
          </MenuItem>
        )
      }
      { children }
    </TextField>
  );
}

CustomTextField.defaultProps = {
  className: '',
  inputProps: {},
  select: false,
  placeholder: '',
  helperText: '',
  children: null,
  error: null,
  restProps: null,
};

CustomTextField.propTypes = {
  className: PropTypes.string,
  inputProps: PropTypes.object,
  select: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  helperText: PropTypes.string,
  error: PropTypes.string,
  restProps: PropTypes.object,
};
