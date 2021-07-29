import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Backdrop, Radio, FormHelperText } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { serialize } from 'object-to-formdata';
import { cloneDeep } from 'lodash';
import BlankProject from 'components/NewProject/BlankProject';
import UploadDocs from 'components/NewProject/UploadDocs';
import ProjectInfo from 'components/NewProject/ProjectInfo';
import WebsiteUrl from 'components/NewProject/WebsiteUrl';
import DiscardProjectModal from 'components/NewProject/DiscardProjectModal';
import { showToast } from 'redux/actions/toast';
import { PROJECT_TYPES, SHARE_TYPES } from 'constants/project';
import { useSubheader } from '_metronic/layout';
import projectSchema from 'schemas/project';
import CustomTextField from 'components/CustomTextField';
import { createProject, updateProject } from 'api/projects';
import { NewProjectFormProvider } from 'context/newProjectForm';
import {
  getProjectRequest,
  updateProjectSuccess,
  createProjectSuccess,
} from 'redux/actions/projects';
import { useStyles } from 'styles/newProject';
import urls from 'constants/urls';
import FocusError from 'custom-hooks/FocusError';
import axios from 'axios';

export default function NewProject() {
  const formRef = useRef();
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const { currentUser, project, allLanguages } = useSelector(({ auth, projects, languages }) => ({
    currentUser: auth.user,
    project: projects.current,
    allLanguages: languages.all,
  }));
  const [activeProjectType, setActiveProjectType] = useState(PROJECT_TYPES.uploadDocs);
  const classes = useStyles();
  const subHeader = useSubheader();
  const history = useHistory();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const isEditing = !!projectId;
  let canEdit = false;

  const breadcrumbs = [
    {
      title: 'Home',
      pathname: urls.home,
    },
    isEditing ? {
      title: 'Update Project',
      pathname: `/home/projects/${projectId}`,
    } : {
      title: 'Create New Project',
      pathname: urls.newProject,
    },
  ];

  useEffect(() => {
    subHeader.setBreadcrumbs(breadcrumbs);
  }, []);

  useEffect(() => {
    if (!isEditing) return;

    if (!Object.keys(project).length) dispatch(getProjectRequest(projectId));
  }, [projectId]);

  useEffect(() => {
    if (!isEditing || !Object.keys(project).length) return;

    if (project.owner_id === currentUser.id) {
      canEdit = true;
    } else if (project.share_type === SHARE_TYPES.shared.value) {
      for (const projectUser of project.project_users) {
        if (projectUser.user.id === currentUser.id
          && projectUser.access_type === SHARE_TYPES.shared.accessTypes.edit.value) {
          canEdit = true;
          break;
        }
      }
    }

    if (!canEdit) {
      dispatch(showToast({
        type: 'error',
        message: 'You are not allowed to edit this project',
      }))

      return history.push(`/home/projects/${projectId}`);
    }

    setActiveProjectType(Object.values(PROJECT_TYPES).find(((projectType) => projectType.id === project.type)));
  }, [project]);

  const handleProjectTypeChange = ({ newSelectedProject }) => {
    if (isEditing) return;

    if (newSelectedProject.id === activeProjectType.id) return;

    setActiveProjectType(newSelectedProject);
  };

  const gotoProjectDetails = (newProjectId) => history.push(`/home/projects/${newProjectId}`);

  const handleFormKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 13) e.preventDefault();
  };

  const handleCancelClick = (isFormDirty) => {
    if (!isFormDirty) return history.goBack();

    setShowDiscardModal(true);
  };

  const getValidationError = (ValidationErrors) => {
    let validationMsg;

    for (const validationErr of ValidationErrors) {
      [validationMsg] = validationErr;
    }

    return validationMsg;
  };

  const handleFormSubmit = () => {
    if (activeProjectType.id === PROJECT_TYPES.blankProject.id) {
      formRef.current.values.type = activeProjectType.id;
    }
    formRef.current.submitForm();
  }

  useEffect(() => {
    formRef.current.setErrors({});
  }, [activeProjectType.id])

  return (
    <>
      <DiscardProjectModal
        open={showDiscardModal}
        projectName={null}
        onClose={() => setShowDiscardModal(false)}
        onConfirm={history.goBack}
      />

      <div className='col bg-white mb-5 py-5 px-5'>
        <h1>{ isEditing ? 'Updating Glossary' : 'New Glossary' }</h1>
      </div>

      <div className='container p-0 py-5'>
        <div className='card card-custom'>
          <div className='mx-30  card-body d-flex align-items-center justify-content-between'>
            <div className='w-100'>
              <Formik
                innerRef={formRef}
                initialValues={isEditing && Object.keys(project).length ? {
                  ...project,
                  name: project.name,
                  secondary_languages: Object.values(allLanguages || [])
                    .filter((lang) => project.secondary_languages.includes(lang.value)),
                  tags: project.tags.map((tag) => tag.name),
                  project_users: project.project_users.length ? project.project_users.map((projectUser) => ({
                    email: projectUser.user.email,
                    access_type: projectUser.access_type,
                  })) : [{
                    email: '',
                    access_type: SHARE_TYPES.shared.accessTypes.view.value,
                  }],
                  files: project.files.map((file) => ({
                    attachment: {
                      ...file.metadata,
                      id: file.id,
                    },
                    language: file.metadata.language || '',
                  })),
                } : {
                  name: '',
                  // type: PROJECT_TYPES.blankProject.id,
                  primary_language: '',
                  secondary_languages: [],
                  description: '',
                  tags: [],
                  keywords: [],
                  client: '',
                  subject_matter: '',
                  share_type: SHARE_TYPES.private.value,
                  project_users: [{
                    email: '',
                    access_type: SHARE_TYPES.shared.accessTypes.view.value,
                  }],
                  files: [],
                  url: '',
                }}
                validationSchema={projectSchema(activeProjectType.id)}
                onSubmit={(values, { setSubmitting }) => {
                  const formValues = cloneDeep(values);

                  formValues.type = activeProjectType.id;

                  if (formValues.type === PROJECT_TYPES.blankProject.id) {
                    delete formValues.primary_language;
                  }

                  if (!formValues.url.includes('http')) formValues.url = `http://${formValues.url}`;

                  formValues.secondary_languages = formValues.secondary_languages.map((lang) => lang.value);

                  if (formValues.share_type !== SHARE_TYPES.shared.value) {
                    delete formValues.project_users;

                    if (isEditing && project.owner_id !== currentUser.id) {
                      delete formValues.share_type;
                    }
                  } else if (isEditing && project.owner_id !== currentUser.id) {
                    delete formValues.project_users;
                    delete formValues.share_type;
                  }

                  if (!isEditing) {
                    const formData = serialize(formValues);
                    createProject(formData)
                      .then(({ data: { project: createdProject } }) => {
                        dispatch(createProjectSuccess({ project: createdProject }));

                        dispatch(showToast({
                          type: 'success',
                          message: 'Project created successfully!',
                        }));

                        gotoProjectDetails(createdProject.id);
                      })
                      .catch((err) => {
                        let errorMsg = err.response?.data?.message
                          ?? err.response?.data?.detail
                          ?? err?.response?.data?.['validation errors'];

                        if (errorMsg) {
                          if (err?.response?.data?.['validation errors']) {
                            errorMsg = getValidationError(Object.values(err?.response?.data?.['validation errors']));
                          }
                        } else {
                          errorMsg = 'Failed to create project!';
                        }

                        dispatch(showToast({
                          type: 'error',
                          message: errorMsg,
                        }));
                      })
                      .finally(() => setSubmitting(false));
                  } else {
                    delete formValues.type;
                    const deletedFiles = project.files.reduce((removedFiles, file) => {
                      const storedFile = formValues.files.find((formFile) => formFile.attachment.id === file.id);

                      if (!storedFile) {
                        removedFiles.push({
                          id: file.id,
                          _destroy: true,
                        });
                      }

                      return removedFiles;
                    }, []);

                    formValues.files = [...formValues.files, ...deletedFiles];

                    formValues.files = formValues.files.filter((file) => file.attachment?.id === undefined);

                    const formData = serialize(formValues);
                    updateProject(projectId, formData)
                      .then(({ data: { project: updatedProject } }) => {
                        dispatch(updateProjectSuccess(updatedProject));

                        dispatch(showToast({
                          type: 'success',
                          message: 'Project updated successfully!',
                        }));

                        gotoProjectDetails(updatedProject.id);
                      })
                      .catch((err) => {
                        let errorMsg = err.response?.data?.message
                          ?? err.response?.data?.detail
                          ?? err?.response?.data?.['validation errors'];

                        if (errorMsg) {
                          if (err?.response?.data?.['validation errors']) {
                            errorMsg = getValidationError(Object.values(err?.response?.data?.['validation errors']));
                          }
                        } else {
                          errorMsg = 'Failed to update project!';
                        }

                        dispatch(showToast({
                          type: 'error',
                          message: errorMsg,
                        }))
                      })
                      .finally(() => setSubmitting(false));
                  }
                }}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  handleChange,
                  setFieldValue,
                  handleSubmit,
                  isSubmitting,
                  initialValues,
                  dirty,
                  setValues,
                }) => (
                  <NewProjectFormProvider
                    value={{
                      values,
                      errors,
                      initialValues,
                      isEditing,
                      handleChange,
                      setFieldValue,
                      activeProjectType,
                    }}
                  >
                    <Backdrop className={classes.backdrop} open={isSubmitting}>
                      <p className='mr-2'>
                        { isEditing ? 'Updating Glossary' : 'Creating Glossary' }
                      </p>
                      <CircularProgress color='inherit' />
                    </Backdrop>
                    <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
                      <ol>
                        <li className={classes.step}>
                          <span>Add Glossary Name</span>
                          <div className='row my-7'>
                            <div className='col-lg-3'>
                              <label className={`mt-2 ${classes.label}`} htmlFor='name'>Glossary Name</label>
                            </div>
                            <div className='col-lg-6'>
                              <CustomTextField
                                id='name'
                                name='name'
                                className={classes.name}
                                placeholder='Enter glossary name'
                                value={values.name}
                                variant='outlined'
                                onChange={handleChange}
                                inputProps={{ style: { backgroundColor: '#F3F6F9' } }}
                                error={!!errors.name}
                                size='small'
                                fullWidth
                              />
                              {
                                errors.name
                                && <FormHelperText className='text-danger ml-4'>{errors.name}</FormHelperText>
                              }
                            </div>
                          </div>
                          <hr className='col-lg-12 mt-7 mb-7' />
                        </li>
                        <li className={classes.step}>
                          <span>Select Glossary type</span>
                          <div className='row mb-7 mt-4'>
                            {
                              Object.values(PROJECT_TYPES).map((projectType) => (
                                <div key={projectType.id} className='col-lg-2 pl-0'>
                                  <ProjectTypeRadio
                                    title={projectType.title}
                                    logo={projectType.logo}
                                    logoFocused={projectType.logoFocused}
                                    onClick={handleProjectTypeChange.bind(this, {
                                      newSelectedProject: projectType,
                                      values,
                                      initialValues,
                                      setValues,
                                    })}
                                    isFocused={projectType.id === activeProjectType.id}
                                    disabled={isEditing}
                                  />
                                </div>
                              ))
                            }
                          </div>
                          <hr className='col-lg-12 mt-7 mb-7' />
                        </li>
                        {
                          activeProjectType.id === PROJECT_TYPES.blankProject.id && <BlankProject />
                        }
                        {
                          activeProjectType.id === PROJECT_TYPES.uploadDocs.id && <UploadDocs />
                        }
                        {
                          activeProjectType.id === PROJECT_TYPES.projectInfo.id && <ProjectInfo />
                        }
                        {
                          activeProjectType.id === PROJECT_TYPES.websiteUrl.id && <WebsiteUrl />
                        }
                      </ol>
                      <div className='row d-flex justify-content-center'>
                        <button
                          className='btn btn-default py-3 px-6 mr-4'
                          type='button'
                          onClick={handleCancelClick.bind(this, dirty)}
                        >
                          Cancel
                        </button>
                        <button
                          className='btn btn-primary py-3 px-6'
                          type='button'
                          disabled={false}
                          onClick={() => handleFormSubmit()}
                        >
                          { !isEditing ? 'Save' : 'Update'}
                        </button>
                      </div>
                      <FocusError />
                    </form>
                  </NewProjectFormProvider>
                )}
              </Formik>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export function ProjectTypeRadio({ title, isFocused, onClick, disabled }) {
  const classes = useStyles();
  const wrapperClasses = `${isFocused ? 'focused' : ''}`;
  const cardWrapperClasses = `${classes.label} ${disabled ? 'cursor-auto' : ''}`;

  return (
    <div className={wrapperClasses} onClick={onClick} role='presentation'>
      <div className={cardWrapperClasses}>
        <Radio
          checked={isFocused}
          value={title}
          name={title}
          size='small'
        />
        <span key={title}>{title}</span>
      </div>
    </div>
  );
}

ProjectTypeRadio.propTypes = {
  title: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
