import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import { FieldArray } from 'formik';
import CustomTextField from 'components/CustomTextField';
import { SHARE_TYPES } from 'constants/project';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';

export default function ShareType() {
  const [canEdit, setCanEdit] = useState(true);
  const {
    values,
    errors,
    initialValues,
    handleChange,
    setFieldValue,
    isEditing,
  } = useContext(NewProjectFormContext);
  const classes = useStyles();
  const { currentUser, project } = useSelector(({ auth, projects }) => ({
    currentUser: auth.user,
    project: projects.current,
  }));

  useEffect(() => {
    if (!isEditing) return;

    if (project.owner_id === currentUser.id || project.share_type === SHARE_TYPES.private.value) {
      setCanEdit(true);
      return;
    }

    setCanEdit(false);
  }, [project]);

  const handleShareTypeChange = ({ target: { value } }) => {
    setFieldValue('share_type', value);
    setFieldValue('project_users', initialValues.project_users);
    setFieldValue('access_type', initialValues.access_type);
  };

  const handleInsertNewProjectUserFields = (projectUserFields) => {
    if (!canEdit) return;

    projectUserFields.push({
      email: '',
      access_type: SHARE_TYPES.shared.accessTypes.view.value,
    });
  };

  return (
    <li className={classes.step}>
      <span>Share</span>
      <div className='row mt-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='share_type'>
            Share Type
          </label>
        </div>
        <div className='col'>
          <CustomTextField
            id='share_type'
            name='share_type'
            value={values.share_type}
            onChange={handleShareTypeChange}
            helperText={SHARE_TYPES[values.share_type]?.helperText}
            variant='outlined'
            error={errors.share_type}
            disabled={!canEdit}
            select
          >
            {Object.values(SHARE_TYPES).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </div>
      </div>
      {
        values.share_type === SHARE_TYPES.shared.value && (
          <div className='row'>
            <hr className={`col-lg-5 mt-7 mb-7 ${classes.hrML}`} />
          </div>
        )
      }
      {
        values.share_type === SHARE_TYPES.shared.value && (
          <>
            <FieldArray
              name='project_users'
              render={(projectUserFields) => (
                <>
                  {
                    values.project_users.map((projectUser, index) => (
                      <div key={index} className='row mt-7'>
                        <div className='col-3'>
                          <label
                            className={`mt-2 ${classes.label}`}
                            htmlFor={`project_users.${index}.email`}
                          >
                            Share With
                          </label>
                        </div>
                        <div className='col-4'>
                          <CustomTextField
                            id={`project_users.${index}.email`}
                            name={`project_users.${index}.email`}
                            value={values.project_users?.[index]?.email}
                            onChange={handleChange}
                            variant='outlined'
                            placeholder='Enter email'
                            error={errors.project_users?.[index]?.email}
                            size='small'
                            disabled={!canEdit}
                            fullWidth
                          />
                        </div>
                        <div className='col-2'>
                          <CustomTextField
                            name={`project_users.${index}.access_type`}
                            value={values.project_users?.[index]?.access_type}
                            onChange={handleChange}
                            variant='outlined'
                            size='small'
                            helperText={errors.project_users?.[index]?.access_type}
                            error={!!errors.project_users?.[index]?.access_type}
                            inputProps={{ className: classes.widthAuto }}
                            disabled={!canEdit}
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
                        <div className='col pt-4'>
                          <div className='d-flex align-items-center'>
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
                  <div className='offset-3 my-4'>
                    <span
                      className='text-primary pointer font-weight-light'
                      onClick={handleInsertNewProjectUserFields.bind(this, projectUserFields)}
                      role='presentation'
                    >
                      + Add email
                    </span>
                  </div>
                </>
              )}
            />
          </>
        )
      }
      <hr className='col-lg-12 mt-7 mb-7' />
    </li>
  );
}
