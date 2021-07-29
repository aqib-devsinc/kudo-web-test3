import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from 'styles/iconBox';

export default function IconBox({ children, className, variant, onClick, ...restProps }) {
  const classes = useStyles();

  const boxClasses = `btn btn-icon
  ${variant === 'light' && 'btn-default'}
  ${variant === 'dark' && classes.greyBox}
  ${variant === 'primary' && 'btn-primary'}
  ${className}
  `;

  return (
    <div className={boxClasses} onClick={onClick} role='presentation' {...restProps}>
      { children }
    </div>
  );
}

IconBox.defaultProps = {
  className: '',
  variant: 'light',
  onClick: null,
  restProps: null,
};

IconBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'light',
    'dark',
    'primary',
  ]),
  onClick: PropTypes.func,
  restProps: PropTypes.objectOf(),
};
