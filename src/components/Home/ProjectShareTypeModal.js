import React from 'react';
import axios from 'axios';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';
import { FieldArray, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { SHARE_TYPES } from 'constants/project';
import CustomTextField from 'components/CustomTextField';
import { shareProjectSchema } from 'schemas/project';
import { showToast } from 'redux/actions/toast';
import { updateProjectSharing } from 'redux/actions/projects';
import CustomModal from 'components/CustomModal';
import { serialize } from 'object-to-formdata';
import { useStyles } from 'styles/home';

export default function ProjectShareTypeModal({ open, onClose, project }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleShareTypeChange = (setFieldValue, { target: { value } }) => {
    setFieldValue('share_type', value);
    setFieldValue('project_users', [{
      email: '',
      access_type: SHARE_TYPES.shared.accessTypes.view.value,
    }]);
  };

  const getValidationError = (ValidationErrors) => {
    let validationMsg;

    for (const validationErr of ValidationErrors) {
      [validationMsg] = validationErr;
    }

    return validationMsg;
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='project-share-dialog'
      fullWidth
    >
      <Formik
        initialValues={{
          share_type: project.share_type,
          project_users: project.project_users?.length
            ? project.project_users.map(({ user, access_type }) => ({
              email: user.email || '',
              access_type: access_type || SHARE_TYPES.shared.accessTypes.view.value,
            })) : [{
              email: '',
              access_type: SHARE_TYPES.shared.accessTypes.view.value,
            }],
        }}
        validationSchema={shareProjectSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formValues = { ...values };

          if (formValues.share_type !== SHARE_TYPES.shared.value) delete formValues.project_users;

          axios.patch(
            `projects/${project.id}?sharing=true`,
            serialize(formValues),
            { headers: { 'Content-Type': 'multipart/form-data' } },
          )
            .then(({ data }) => {
              const updatedProject = {
                ...project, ...data.project,
              };

              dispatch(updateProjectSharing({
                id: project.id,
                oldShareType: project.share_type,
                project: updatedProject,
              }));

              dispatch(showToast({
                type: 'success',
                message: 'Updated project sharing',
              }));
              onClose();
            })
            .catch((err) => {
              const errorMsg = err.response?.data?.message
                ?? err.response?.data?.detail
                ?? getValidationError(Object.values(err.response.data['validation errors']))
                ?? 'Failed to change sharing!';

              dispatch(showToast({
                type: 'error',
                message: errorMsg,
              }))
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          setFieldValue,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='p-7'>
              <DialogTitle className='p-0'>Share</DialogTitle>
              <DialogContent className='px-0 overflow-hidden'>
                <div className='row mt-7'>
                  <div className='col-3'>
                    <label className='mt-2' htmlFor='share_type'>Share Type</label>
                  </div>
                  <div className='col-6'>
                    <CustomTextField
                      id='share_type'
                      name='share_type'
                      value={values.share_type}
                      onChange={handleShareTypeChange.bind(this, setFieldValue)}
                      helperText={SHARE_TYPES[values.share_type]?.helperText}
                      variant='outlined'
                      inputProps={{ className: classes.input }}
                      error={errors.share_type}
                      select
                      fullWidth
                    >
                      {Object.values(SHARE_TYPES).map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </div>
                </div>
              </DialogContent>
              {
                values.share_type === SHARE_TYPES.shared.value && (
                  <>
                    <hr />
                    <DialogContent className='px-0 overflow-hidden'>
                      <FieldArray
                        name='project_users'
                        render={(projectUserFields) => (
                          <div>
                            {
                              values.project_users.map((projectUser, index) => (
                                <div key={index}>
                                  <div className='row mt-7'>
                                    <div className='col-2'>
                                      <label
                                        className='mt-2'
                                        htmlFor={`project_users.${index}.email`}
                                      >
                                        Share With
                                      </label>
                                    </div>
                                    <div className='col-6'>
                                      <CustomTextField
                                        id={`project_users.${index}.email`}
                                        name={`project_users.${index}.email`}
                                        value={values.project_users?.[index]?.email}
                                        onChange={handleChange}
                                        variant='outlined'
                                        placeholder='Enter email'
                                        error={errors.project_users?.[index]?.email}
                                        inputProps={{ className: classes.input }}
                                        size='small'
                                        fullWidth
                                      />
                                    </div>
                                    <div className='col'>
                                      <CustomTextField
                                        name={`project_users.${index}.access_type`}
                                        value={values.project_users?.[index]?.access_type}
                                        onChange={handleChange}
                                        variant='outlined'
                                        size='small'
                                        error={errors.project_users?.[index]?.access_type}
                                        inputProps={{ className: classes.input }}
                                        select
                                        fullWidth
                                      >
                                        {Object.values(SHARE_TYPES.shared.accessTypes).map((option) => (
                                          <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </CustomTextField>
                                    </div>
                                    <div className='col-1 pt-2'>
                                      {
                                        index !== 0 && (
                                          <i
                                            className='quick-search-close ki ki-close icon-sm text-muted pointer'
                                            onClick={() => projectUserFields.remove(index)}
                                            role='presentation'
                                          />
                                        )
                                      }
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                            <div className='offset-2 col my-4'>
                              <span
                                className='text-primary pointer'
                                onClick={() => projectUserFields.push({
                                  email: '', access_type: SHARE_TYPES.shared.accessTypes.view.value,
                                })}
                                role='presentation'
                              >
                                + Add email
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    </DialogContent>
                  </>
                )
              }
              {
                values.share_type === SHARE_TYPES.public.value && (
                  <>
                    <hr />
                    <DialogContent className='px-0 overflow-hidden'>
                      <div className='row mt-7'>
                        <div className='col-3'>
                          <label className='mt-2' htmlFor={`project_users.${0}.access_type`}>Access type</label>
                        </div>
                        <div className='col-6'>
                          <CustomTextField
                            id={`project_users.${0}.access_type`}
                            name={`project_users.${0}.access_type`}
                            value={values.project_users?.[0]?.access_type}
                            onChange={handleChange}
                            variant='outlined'
                            size='small'
                            error={errors.project_users?.[0]?.access_type}
                            inputProps={{ className: classes.input }}
                            fullWidth
                            select
                            disabled
                          >
                            {Object.values(SHARE_TYPES.shared.accessTypes).map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        </div>
                      </div>
                    </DialogContent>
                  </>
                )
              }
              <hr />
              <DialogActions>
                <button className='btn btn-default py-2 px-6 mr-4' type='button' onClick={onClose}>Cancel</button>
                <button className='btn btn-primary py-2 px-6' type='submit' disabled={isSubmitting}>Save</button>
              </DialogActions>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

ProjectShareTypeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};
