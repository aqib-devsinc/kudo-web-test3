import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { SHARE_TYPES } from 'constants/project';
import ProjectShareTypeModal from 'components/Home/ProjectShareTypeModal';

export default function SubHeader() {
  const [canEditProject, setCanEditProject] = useState(true);
  const [showShareTypeModal, setShowShareTypeModal] = useState(false);

  const { project, currentUser } = useSelector(({ projects, auth }) => ({
    currentUser: auth.user,
    project: projects.current,
  }));
  const { projectId } = useParams();

  useEffect(() => {
    if (!Object.keys(project).length) return setCanEditProject(false);

    if (project.owner_id === currentUser.id || project.share_type === SHARE_TYPES.private.value) {
      setCanEditProject(true);
    } else if (project.share_type === SHARE_TYPES.public.value) {
      setCanEditProject(false);
    } else {
      const projectUser = project.project_users.find((project_user) => project_user.user.id === currentUser.id);

      if (projectUser.access_type === SHARE_TYPES.shared.accessTypes.edit.value) {
        setCanEditProject(true);
      } else {
        setCanEditProject(false);
      }
    }
  }, [project, project.share_type]);

  const handleGotoProject = (e) => {
    if (!canEditProject) e.stopPropagation();
  }

  const handleCloseShareTypeModal = () => {
    setShowShareTypeModal(false);
  };

  const handleShareClick = () => {
    setShowShareTypeModal(true);
  };

  return (
    <>
      {
        showShareTypeModal && (
          <ProjectShareTypeModal
            open={showShareTypeModal}
            onClose={handleCloseShareTypeModal}
            project={project}
          />
        )
      }
      <div className='d-flex align-items-center justify-content-stretch mb-3 mr-2 pt-3'>
        <Link to={`/home/update-project/${projectId}`} onClick={handleGotoProject}>
          <button
            className='btn btn-default action-btn text-primary font-weight-bold mr-4'
            disabled={!canEditProject}
            type='button'
          >
            Edit Glossary
          </button>
        </Link>
        {
          project.owner_id === currentUser.id && (
            <button className='btn btn-default action-btn' type='button' onClick={handleShareClick}>
              Share
            </button>
          )
        }
      </div>
    </>
  );
}
