import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from 'styles/customSwitch';

export default function CustomSwitch({ label, checked, onChange, className }) {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={(
        <Switch
          color='primary'
          checked={checked}
          onChange={onChange}
          focusVisibleClassName={classes.focusVisible}
          className={className}
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          disableRipple
        />
      )}
      label={label}
      labelPlacement='start'
    />
  );
}

CustomSwitch.defaultProps = {
  label: '',
  className: '',
};

CustomSwitch.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
