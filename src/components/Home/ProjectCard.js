import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { DropdownCustomToggler } from '_metronic/_partials/dropdowns';
import { deleteProjectRequest } from 'redux/actions/projects';
import { SHARE_TYPES } from 'constants/project';
import { VIEW_TYPE } from 'constants/home';
import { useStyles } from 'styles/home';
import ProjectShareTypeModal from './ProjectShareTypeModal';
import DeleteProjectModal from './DeleteProjectModal';

export default function ProjectCard({ view, project, tab }) {
  const classes = useStyles();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareTypeModal, setShowShareTypeModal] = useState(false);
  const dispatch = useDispatch();

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteProject = () => {
    dispatch(deleteProjectRequest(project));
    setShowDeleteModal(false);
  };

  const handleCloseShareTypeModal = () => {
    setShowShareTypeModal(false);
  };

  const handleShareClick = () => {
    setShowShareTypeModal(true);
  };

  return (
    <>
      {
        showDeleteModal && (
          <DeleteProjectModal
            open={showDeleteModal}
            onClose={handleCloseDeleteModal}
            onDelete={handleDeleteProject}
            projectName={project.name}
          />
        )
      }
      {
        showShareTypeModal && (
          <ProjectShareTypeModal
            open={showShareTypeModal}
            onClose={handleCloseShareTypeModal}
            project={project}
          />
        )
      }
      <div className='card card-custom card-stretch gutter-b'>
        <div className='card-body d-flex flex-column'>
          <div className='flex-grow-1 pb-5'>
            <div className='d-flex align-items-center pr-2 mb-6'>
              <span className='text-muted font-weight-bold font-size-lg flex-grow-1'>
                { moment(project.created_at).fromNow() }
              </span>
              {
                tab === SHARE_TYPES.private.value && (
                  <div className='card-toolbar'>
                    <Dropdown className='dropdown-inline' alignRight>
                      <Dropdown.Toggle
                        className='btn btn-clean btn-hover-light-primary btn-sm btn-icon'
                        variant='transparent'
                        id='dropdown-toggle-top'
                        as={DropdownCustomToggler}
                      >
                        <i className='ki ki-bold-more-hor' />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShareClick}>Share</Dropdown.Item>
                        <Dropdown.Item className='text-danger' onClick={handleOpenDeleteModal}>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )
              }
            </div>

            <h4
              className={
                `${classes.projectNameHeight}
                text-dark font-weight-bolder text-hover-primary font-size-h4`
              }
            >
              { project.name }
            </h4>
            <CardBody view={view} projectUsers={project.project_users} projectId={project.id} />
          </div>
        </div>
      </div>
    </>
  );
}

ProjectCard.propTypes = {
  view: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired,
};

const CardBody = ({ view, projectId, projectUsers }) => {
  const classes = useStyles();

  return (
    view === VIEW_TYPE.grid ? (
      <>
        <div className={`d-flex align-items-center mb-20 ${classes.minUsersHeight}`}>
          <ProjectUsers projectUsers={projectUsers} />
        </div>
        <div>
          <Link to={`/home/projects/${projectId}`}>
            <button className='btn btn-primary px-10' type='button'>open</button>
          </Link>
        </div>
      </>
    ) : (
      <div className={`d-flex justify-content-between align-items-end ${classes.minUsersHeight}`}>
        <Link to={`/home/projects/${projectId}`}>
          <button className='btn btn-primary px-10' type='button'>open</button>
        </Link>
        <div className='d-flex align-items-center'>
          <ProjectUsers projectUsers={projectUsers} />
        </div>
      </div>
    )
  );
};

CardBody.defaultProps = { projectUsers: [] };
CardBody.propTypes = {
  view: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  projectUsers: PropTypes.array,
};

const ProjectUsers = ({ projectUsers }) => (
  <>
    {
        projectUsers?.slice(0, 4)?.map(({ user }) => (
          <span key={user.id}>
            <div className='symbol symbol-light'>
              <img
                className='rounded-circle'
                src={toAbsoluteUrl('/media/svg/avatars/user.svg')}
                alt={user.full_name}
              />
            </div>
          </span>
        ))
    }
    {
      !!projectUsers?.slice(5).length && (
        <span>
          <div className='symbol symbol-light'>
            <p className='rounded-circle bg-red mt-3'>
              {projectUsers?.slice(5).length}
              +
            </p>
          </div>
        </span>
      )
    }
  </>
);

ProjectUsers.defaultProps = { projectUsers: [] };
ProjectUsers.propTypes = { projectUsers: PropTypes.array };
