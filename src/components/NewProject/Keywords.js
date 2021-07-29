import React, { useContext, useState, useEffect } from 'react';
import ChipInput from 'material-ui-chip-input';
import { FormHelperText } from '@material-ui/core';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';

export default function Keywords() {
  const {
    values,
    errors,
    setFieldValue,
  } = useContext(NewProjectFormContext);
  const classes = useStyles();
  const [keywordsError, setKeywordsError] = useState('');

  const setErrorTimeout = () => {
    setTimeout(() => setKeywordsError(''), 3000);
  };

  const handelAddKeyword = (newKeyword) => {
    if (newKeyword.length > 50) {
      setKeywordsError('Maximum 50 characters allowed');
      setErrorTimeout();
      return;
    }

    setFieldValue('keywords', [...values.keywords, newKeyword]);
  }

  return (
    <li className={classes.step}>
      <span>Add Keywords</span>
      <div className='row mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='keywords'>Keywords</label>
          <small className='d-block text-muted'>
            In order to increase term relevance, a minimum of 3 keywords is required
          </small>
        </div>
        <div className='col-lg-6'>
          <ChipInput
            id='keywords'
            name='keywords'
            className={`${classes.chipInput} ${
              errors.keywords ? classes.keywordsError : ''
            }`}
            value={values.keywords}
            placeholder='Type and enter some keywords'
            variant='outlined'
            onAdd={(newKeyword) => handelAddKeyword(newKeyword)}
            onDelete={(deletedKeyword) => setFieldValue(
              'keywords', values.keywords.filter((keyword) => keyword !== deletedKeyword),
            )}
            helperText={errors.keywords}
            error={!!errors.keywords || !!keywordsError}
            fullWidth
            size='small'
          />
          <div className='col-12'>
            <small key={keywordsError} className='text-danger'>{ keywordsError }</small>
          </div>
        </div>
      </div>
    </li>
  );
}
