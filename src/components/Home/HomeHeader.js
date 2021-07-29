import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNewProjectName, resetNewProjectName } from 'redux/actions/projects';
import CustomTextField from 'components/CustomTextField';
import urls from 'constants/urls';

const { PUBLIC_URL } = process.env;
const MAX_PROJECT_NAME_CHARS = 50;

export default function HomeHeader() {
  const projectName = useSelector(({ projects }) => projects.new.name);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectName) dispatch(resetNewProjectName());
  }, []);

  const handleProjectNameChange = (e) => {
    const { value } = e.target;

    if (MAX_PROJECT_NAME_CHARS - value.length < 0) return;

    if (value) setError(null);

    dispatch(setNewProjectName(value));
  };

  const handleCreateProject = (e) => {
    if (projectName.trim().length) return;

    e.preventDefault();

    setError(!projectName.length ? 'Required' : 'Name can not be just white spaces');
  };

  return (
    <div
      id='home-header'
      className='card card-custom'
      style={{
        height: '220px',
        backgroundImage: `url(${PUBLIC_URL}/media/svg/custom/tile-bg.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div className='card-body d-flex align-items-center justify-content-between flex-wrap'>
        <div className='mr-2 col-lg-6'>
          <h3 className='font-weight-bolder text-primary mb-10'>
            Create New Project
          </h3>
          <div className='text-dark-50 font-size-lg'>
            <CustomTextField
              id='project_name'
              name='project_name'
              placeholder='Enter project name'
              value={projectName}
              onChange={handleProjectNameChange}
              variant='outlined'
              inputProps={{ style: { backgroundColor: '#fff' } }}
              error={error}
              fullWidth
            />
          </div>
          <Link to={urls.newProject} onClick={handleCreateProject}>
            <button
              className='btn btn-primary font-weight-bold py-3 px-6 mt-6 create-project-btn'
              type='button'
            >
              Create Project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
