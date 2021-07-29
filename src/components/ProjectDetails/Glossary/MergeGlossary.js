import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CustomModal from 'components/CustomModal';
import { showToast } from 'redux/actions/toast';
import { getProjects } from 'api/projects';
import { getProjectGlossaryRequest } from 'redux/actions/projects';
import { useStyles } from 'styles/newProject';
import { GLOSSARY_DEFAULT_PAGE, GLOSSARY_DEFAULT_PER_PAGE } from 'constants/projectDetails';
import { SHARE_TYPES } from 'constants/project';

function MergeGlossary({ mergedProjects, setMergedProjects }) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [projects, setProjects] = useState([]);
  const [value, setValue] = useState(mergedProjects.length ? mergedProjects : []);
  const currentUser = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    getProjects('all').then((response) => {
      if (response.error) throw response;

      setProjects(response.projects.filter((project) => project.id !== parseInt(projectId, 10)));
    }).catch(() => dispatch(showToast({
      type: 'error',
      message: 'Failed to fetch projects',
    })));
  }, []);

  const handleToggleModal = useCallback(() => setModalOpened(!isModalOpened));

  const handleOnCancel = useCallback(() => {
    setModalOpened(false);
    setValue(mergedProjects);
  });

  const handleOnSave = useCallback(() => {
    if (value.length) {
      setMergedProjects(value);
      dispatch(getProjectGlossaryRequest({
        projectId,
        mergedProjectIds: value.map((mergedProject) => mergedProject.id),
        page: GLOSSARY_DEFAULT_PAGE,
        perPage: GLOSSARY_DEFAULT_PER_PAGE,
      }));
    }

    setModalOpened(false);
  });

  const getProjectLabel = (option) => {
    const project = projects.find((proj) => proj.id === option.id);

    if (!project) return;

    if (project.owner.id === currentUser.id) return `${project.name} by You`;

    if (project.share_type === SHARE_TYPES.shared.value) return `${project.name} by ${project.owner.full_name}`;

    return `${project.name} Public`;
  };

  return (
    <>
      <button
        className='btn btn-primary font-weight-bold'
        onClick={handleToggleModal}
        type='button'
      >
        Add / Remove Glossary
      </button>
      <CustomModal
        open={isModalOpened}
        onClose={handleOnCancel}
        aria-labelledby='add-remove-glossary-dialog'
        fullWidth
      >
        <div className='p-7'>
          <DialogTitle className='p-0 mb-10'>Add / Remove Glossary</DialogTitle>
          <DialogContent className='p-0 mb-10'>
            <div className='w-100'>
              <Autocomplete
                options={projects}
                getOptionLabel={(option) => getProjectLabel(option)}
                value={value}
                filterOptions={() => projects
                  .filter((project) => !value
                    .find((mergedProject) => mergedProject.id === project.id))}
                onChange={(_, selectedProjects) => {
                  setValue(selectedProjects.map((project) => ({
                    id: project.id,
                    name: project.name,
                  })));
                }}
                multiple
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='add-project-glossary'
                    variant='outlined'
                    placeholder='Enter glossary name'
                    className={`${classes.autocompleteInput}`}
                    size='small'
                    fullWidth
                  />
                )}
              />
            </div>
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

MergeGlossary.propTypes = {
  mergedProjects: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  setMergedProjects: PropTypes.func.isRequired,
};

export default memo(MergeGlossary);
