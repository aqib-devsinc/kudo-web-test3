import React from 'react';
import {
  DialogActions,
  DialogTitle,
  FormHelperText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal';

export default function DiscardProjectModal({ open, projectName, onClose, onConfirm }) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='discard-confirmation-dialog'
    >
      <div className='p-7'>
        <DialogTitle className='p-0'>Are you sure you want to discard this project?</DialogTitle>
        <FormHelperText>{projectName}</FormHelperText>
        <hr />
        <DialogActions>
          <button className='btn btn-default py-2 px-6 mr-4' onClick={onClose} type='button'>No</button>
          <button className='btn btn-danger py-2 px-6' onClick={onConfirm} type='button'>Yes</button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

DiscardProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  projectName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
