import React from 'react';
import {
  DialogActions,
  DialogTitle,
  FormHelperText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal';

export default function DeleteProjectModal({ open, onClose, onDelete, projectName }) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='project-delete-dialog'
    >
      <div className='p-7'>
        <DialogTitle className='p-0'>Are you sure you want to delete this glossary?</DialogTitle>
        <FormHelperText>{projectName}</FormHelperText>
        <hr />
        <DialogActions>
          <button className='btn btn-default py-2 px-6 mr-4' onClick={onClose} type='button'>Cancel</button>
          <button className='btn btn-danger py-2 px-6' onClick={onDelete} type='button'>Delete</button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

DeleteProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
};
