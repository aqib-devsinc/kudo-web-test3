/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useLayoutEffect, useEffect, useState } from "react";
import objectPath from "object-path";
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader,
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { SHARE_TYPES } from 'constants/project';
import ProjectShareTypeModal from 'components/Home/ProjectShareTypeModal';

export function SubHeader() {
  const [canEditProject, setCanEditProject] = useState(true);
  const [showShareTypeModal, setShowShareTypeModal] = useState(false);
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();
  const { project, currentUser } = useSelector(({ projects, auth }) => ({
    currentUser: auth.user,
    project: projects.current,
  }));
  const projectId = location.pathname.split('/').pop();

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      ),
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  useEffect(() => {
    if (!subheader.showProjectActions) return;

    if (!Object.keys(project).length) return setCanEditProject(false);

    if (project.owner_id === currentUser.id || project.share_type === SHARE_TYPES.private.value) {
      setCanEditProject(true);
    } else if (project.share_type === SHARE_TYPES.public.value) {
      setCanEditProject(false);
    } else {
      const projectUser = project.project_users.find(projectUser => projectUser.user.id === currentUser.id);

      if (projectUser.access_type === SHARE_TYPES.shared.accessTypes.edit.value) {
        setCanEditProject(true);
      } else {
        setCanEditProject(false);
      }
    }
  }, [project, subheader.showProjectActions]);

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
      <div
        id="kt_subheader"
        className={`subheader py-2 py-lg-12   ${layoutProps.subheaderCssClasses}`}
      >
        <div
          className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
        >
          {/* Info */}
          <div className="d-flex align-items-center flex-wrap mr-1">
            {/* begin::Mobile Toggle */}
            {layoutProps.subheaderMobileToggle && (
              <button
                className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                id="kt_subheader_mobile_toggle"
              >
                <span />
              </button>
            )}
            {/* end::Mobile Toggle */}

            {/* begin::Heading */}
            <div className="d-flex flex-column">
              {/* begin::Title */}
              <h2 className="font-weight-bold my-2 mr-5">
                {subheader.title}
              </h2>
              {/* end::Title */}

              <BreadCrumbs items={subheader.breadcrumbs} />
            </div>
            {/* end::Heading */}
          </div>

          {/* Toolbar */}
          {
            subheader.showProjectActions && (
              <div className='d-flex align-items-center'>
                <Link to={`/home/update-project/${projectId}`} onClick={handleGotoProject}>
                  <button className='btn action-btn text-primary font-weight-bold mr-4' disabled={!canEditProject}>Edit Project</button>
                </Link>
                {
                  project.owner_id === currentUser.id && (
                    <button className="btn action-btn" onClick={handleShareClick}>
                      Share
                    </button>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}
