import React, { useEffect, useState } from 'react';
import {
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FILE_DETAIL_ACTIONS_TYPES } from 'constants/projectDetails';
import CustomModal from 'components/CustomModal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { showToast } from 'redux/actions/toast';
import { useStyles } from 'styles/projectDetails';

export default function FileCorpusViewModal({ open, onClose, file, actionType }) {
  const [data, setData] = useState('');
  const [fileAction, setFileAction] = useState({});
  const { projectId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!actionType) return;

    setFileAction(
      Object.values(FILE_DETAIL_ACTIONS_TYPES).find(
        (action) => action.value === actionType,
      ),
    );
  }, [actionType])

  useEffect(() => {
    if (!file.id || !fileAction.value) return;

    if (file.id && fileAction.value === FILE_DETAIL_ACTIONS_TYPES.all_summary.value) {
      axios.get(`projects/${projectId}/summary`)
        .then((response) => {
          setData(window.atob(response.data));
        })
        .catch((err) => dispatch(showToast({
          type: 'error',
          message: err.response.data.message ?? `Failed to fetch ${fileAction.label}`,
        })))
      return;
    }

    axios.get(`projects/${projectId}/file/${file.id}/${fileAction.value}`)
      .then((response) => {
        setData(window.atob(response.data));
      })
      .catch((err) => dispatch(showToast({
        type: 'error',
        message: err.response.data.message ?? `Failed to fetch ${fileAction.label}`,
      })))

    return () => {
      setData('');
      setFileAction({});
    }
  }, [file.id, fileAction.value]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='project-delete-dialog'
      fullWidth
    >
      <div className='p-7'>
        <h4 className='p-0 mb-7'>
          {fileAction.label}
          &nbsp;Preview
        </h4>
        <DialogContent className='mb-7'>
          <h6 className='mb-4'>{ file.name }</h6>
          <div className={`${classes.corpus} pb-2 overflow-auto`}>
            <Typography gutterBottom>{ data }</Typography>
          </div>
        </DialogContent>
        <hr />
        <DialogActions>
          <button className='btn btn-primary py-2 px-6 mr-4' onClick={onClose} type='button'>Close</button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

FileCorpusViewModal.defaultProps = { file: {} };

FileCorpusViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  file: PropTypes.objectOf({
    name: PropTypes.string,
    corpusLink: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
};
