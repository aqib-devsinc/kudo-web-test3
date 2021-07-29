import React, { useContext } from 'react';
import CustomTextField from 'components/CustomTextField';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';
import AdditionalInfo from './AdditionalInfo';
import ShareType from './ShareType';

export default function WebsiteUrl() {
  const { values, errors, handleChange } = useContext(NewProjectFormContext);
  const classes = useStyles();

  return (
    <>
      <AdditionalInfo />
      <ShareType />
      <li className={classes.step}>
        <span className={classes.step}>Add website URL</span>
        <div className='row mb-7'>
          <div className='col-lg-3'>
            <label className={`mt-2 ${classes.label}`} htmlFor='url'>Website URL</label>
          </div>
          <div className='col-lg-6'>
            <CustomTextField
              id='url'
              name='url'
              placeholder='Enter website URL (www.google.com)'
              value={values.url}
              onChange={handleChange}
              variant='outlined'
              error={errors.url}
              fullWidth
              size='small'
            />
          </div>
        </div>
        <hr className='col-lg-12 mt-7 mb-7' />
      </li>
    </>
  );
}
