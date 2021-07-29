import React, { useCallback } from 'react';
import {
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteProjectFileRequest } from 'redux/actions/projects';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal';

export default function FileDeleteConfirmationModal({ open, onClose, file }) {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const handleFileDelete = useCallback(() => {
    if (file.id) {
      dispatch(deleteProjectFileRequest({
        id: parseInt(projectId, 10),
        fileId: file.id,
      }));
    }
    onClose();
  }, [file]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='project-delete-dialog'
      maxWidth='sm'
    >
      <div className=''>
        <DialogContent>
          Are you sure you want to delete&nbsp;
          <b>
            { file?.name }
          </b>
          &nbsp;?
        </DialogContent>
        <hr />
        <DialogActions>
          <button className='btn btn-primary' onClick={onClose} type='button'>Close</button>
          <button
            className='btn btn-danger'
            onClick={handleFileDelete}
            type='button'
          >
            Delete
          </button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

FileDeleteConfirmationModal.defaultProps = { file: {} };

FileDeleteConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  file: PropTypes.objectOf({
    name: PropTypes.string,
    corpusLink: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
