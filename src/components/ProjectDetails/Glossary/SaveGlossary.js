import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DialogTitle, DialogContent, DialogActions, Tooltip } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import CustomModal from 'components/CustomModal';
import CustomTextField from 'components/CustomTextField';
import { showToast } from 'redux/actions/toast';

function SaveGlossary({ mergedProjectIds, setIsNewMergedProjectAdded }) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [value, setValue] = useState('');
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(() => {
    if (!mergedProjectIds.length) {
      return dispatch(showToast({
        type: 'error',
        message: 'Please add some glossary(s) before save',
      }))
    }

    setModalOpened(true);
  });

  const handleOnChange = useCallback(({ target: { value: newValue } }) => setValue(newValue));

  const handleOnCancel = useCallback(() => {
    setModalOpened(false);
    setValue('');
  });

  const handleOnSave = useCallback(() => {
    if (!value) return;

    const url = `/projects/${projectId}/merged-glossaries?${mergedProjectIds
      .map((mergedProjectId) => `id[]=${mergedProjectId}`)
      .join('&')}`;

    axios.post(url, { name: value }).then(() => {
      setModalOpened(false);
      setIsNewMergedProjectAdded(true);
      dispatch(showToast({
        type: 'success',
        message: 'Saved merged glossary',
      }));
    }).catch((e) => {
      let errorMsg = 'Failed to save glossary';

      if (e.response?.data?.['validation errors']?.name) [errorMsg] = e.response.data['validation errors']?.name;

      dispatch(showToast({
        type: 'error',
        message: errorMsg,
      }))
    });
  });

  return (
    <>
      <Tooltip title='Save merged glossary' arrow>
        <span>
          <IconBox variant='dark' className='mr-4' onClick={handleOpenModal}>
            <SVG src='/media/svg/icons/General/Save.svg' />
          </IconBox>
        </span>
      </Tooltip>
      <CustomModal
        open={isModalOpened}
        onClose={handleOnCancel}
        aria-labelledby='add-remove-glossary-dialog'
        fullWidth
      >
        <div className='p-7'>
          <DialogTitle className='p-0 mb-10'>Save Table</DialogTitle>
          <DialogContent className='p-0 mb-10'>
            <Row noGutters>
              <Col className='col-3 d-flex align-items-center'>
                <label className='m-0' htmlFor='save-glossary'>Table Name</label>
              </Col>
              <Col>
                <CustomTextField
                  id='save-glossary'
                  placeholder='Enter table name'
                  value={value}
                  onChange={handleOnChange}
                  variant='outlined'
                  size='small'
                  error={!value && 'Required'}
                  fullWidth
                />
              </Col>
            </Row>
          </DialogContent>
          <hr />
          <DialogActions>
            <button className='btn btn-default py-2 px-6 mr-4' onClick={handleOnCancel} type='button'>Cancel</button>
            <button className='btn btn-primary py-2 px-6' onClick={handleOnSave} type='button'>Save</button>
          </DialogActions>
        </div>
      </CustomModal>
    </>
  );
}

SaveGlossary.propTypes = {
  mergedProjectIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setIsNewMergedProjectAdded: PropTypes.bool.isRequired,
};

export default memo(SaveGlossary);
