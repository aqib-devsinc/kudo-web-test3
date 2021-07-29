import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';
import { DialogTitle, DialogContent, DialogActions, MenuItem, Tooltip } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import CustomModal from 'components/CustomModal';
import CustomTextField from 'components/CustomTextField';
import { showToast } from 'redux/actions/toast';
import { GLOSSARY_DEFAULT_PAGE, GLOSSARY_DEFAULT_PER_PAGE } from 'constants/projectDetails';
import { getProjectGlossaryRequest } from 'redux/actions/projects';

function MergedGlossaries({
  mergedProjects,
  setMergedProjects,
  setMergeGlossaryTableName,
  isNewMergedProjectAdded,
}) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [mergedGlossaries, setMergedGlossaries] = useState(mergedProjects.length
    ? mergedProjects.reduce((mergedGlossary, mergedProject) => {
      if (!mergedGlossary.name) mergedGlossary.name = mergedProject.name;

      if (!mergedGlossary.glossary_ids?.length) {
        mergedGlossary.glossary_ids = [mergedProject.id];
      } else {
        mergedGlossary.glossary_ids.push(mergedProject.id);
      }

      return mergedGlossary;
    }, {})
    : []);
  const [value, setValue] = useState('');
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`projects/${projectId}/merged-glossaries`).then(({ data }) => {
      setMergedGlossaries(data.glossary_groups);
    }).catch(() => dispatch(showToast({
      type: 'error',
      message: 'Failed to get merged glossaries',
    })));
  }, [isNewMergedProjectAdded]);

  const handleOpenModal = useCallback(() => {
    setModalOpened(true);
  }, []);

  const handleOnChange = useCallback(({ target: { value: newValue } }) => setValue(newValue), []);

  const handleOnCancel = useCallback(() => {
    setModalOpened(false);
    setValue('');

    if (value) setMergedProjects([]);
  }, [value]);

  const handleOnOpenMergedGlossary = useCallback(() => {
    if (!value) return;

    setMergeGlossaryTableName(value.name);

    setMergedProjects(value.project_ids.map((glossaryId) => ({
      id: glossaryId,
      name: value.name,
    })));
    setModalOpened(false);

    const qp = queryString.parse(window.location.search);
    dispatch(getProjectGlossaryRequest({
      projectId,
      page: GLOSSARY_DEFAULT_PAGE,
      perPage: qp.per_page || GLOSSARY_DEFAULT_PER_PAGE,
      searchTerm: qp.search_term,
      orderBy: qp.order_by,
      order: qp.order,
      orderByLang: qp.order_by_lang,
      searchFilter: {
        lang: qp.search_lang,
        col: qp.search_col,
      },
      mergeGlossaryTableName: value.name,
    }));
  });

  return (
    <>
      <Tooltip title='Merged glossaries' arrow>
        <span>
          <IconBox variant='dark' className='mr-4' onClick={handleOpenModal}>
            <SVG src='/media/svg/icons/General/Folder.svg' />
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
          <DialogTitle className='p-0 mb-10'>Open Table</DialogTitle>
          <DialogContent className='p-0 mb-10'>
            <Row noGutters>
              <Col className='col-2' />
              <Col>
                <CustomTextField
                  select
                  value={value}
                  onChange={handleOnChange}
                  variant='outlined'
                  placeholder='Select a table'
                  error={!value ? 'Required' : null}
                >
                  {Object.values(mergedGlossaries).map((mergedGlossary) => (
                    <MenuItem key={mergedGlossary.name} value={mergedGlossary}>
                      {mergedGlossary.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Col>
              <Col className='col-2' />
            </Row>
          </DialogContent>
          <hr />
          <DialogActions>
            <button className='btn btn-default py-2 px-6 mr-4' onClick={handleOnCancel} type='button'>Cancel</button>
            <button
              className='btn btn-primary py-2 px-6'
              onClick={handleOnOpenMergedGlossary}
              type='button'
            >
              Open
            </button>
          </DialogActions>
        </div>
      </CustomModal>
    </>
  );
}

MergedGlossaries.propTypes = {
  mergedProjects: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  setMergedProjects: PropTypes.func.isRequired,
  setMergeGlossaryTableName: PropTypes.func.isRequired,
  isNewMergedProjectAdded: PropTypes.bool.isRequired,
};

export default memo(MergedGlossaries);
