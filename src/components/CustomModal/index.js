import React from 'react';
import { useSelector } from 'react-redux';
import {
  Dialog,
  Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />);
export default function CustomModal({ open, children, ...restProps }) {
  const isOpen = useSelector(({ modal }) => modal.isOpen);

  return (
    <Dialog
      open={open || isOpen}
      TransitionComponent={Transition}
      {...restProps}
    >
      { children }
    </Dialog>
  );
}

CustomModal.defaultProps = {
  open: false,
  restProps: {},
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
  restProps: PropTypes.object,
};
