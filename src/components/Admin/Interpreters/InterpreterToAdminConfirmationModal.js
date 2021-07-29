import React, { useCallback } from 'react';
import {
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal';
import { updateAdminInterpretersRoles } from '../../../redux/actions/admin';

export default function InterpreterToAdminConfirmationModal({ open, onClose, interpreter, assignRoles }) {
  const dispatch = useDispatch();

  const handleMakeAdminAction = useCallback(() => {
    dispatch(updateAdminInterpretersRoles({
      id: interpreter.id,
      roles: assignRoles,
    }))
    onClose();
  }, [interpreter, assignRoles]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='project-delete-dialog'
      maxWidth='sm'
    >
      <div className=''>
        <DialogContent>
          Are you sure you want &nbsp;
          <b>
            { interpreter?.name }
          </b>
          &nbsp;
          {
            (assignRoles.indexOf('admin') === -1) ? 'to be interpreter only?' : 'to be admin?'
          }
        </DialogContent>
        <hr />
        <DialogActions>
          <button className='btn btn-default py-2 px-6 mr-4' onClick={onClose} type='button'>Close</button>
          <button
            className='btn btn-primary py-2 px-6'
            onClick={handleMakeAdminAction}
            type='button'
          >
            Yes
          </button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

InterpreterToAdminConfirmationModal.defaultProps = { interpreter: {} };

InterpreterToAdminConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  interpreter: PropTypes.objectOf({
    name: PropTypes.string,
    interpreterId: PropTypes.number,
  }),
  assignRoles: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
